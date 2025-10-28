import { getTrails } from "@/services/plan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import useToast from "./useToast";
import { createTrailAction } from "@/actions/trails/create-trail.action";
import { deleteTrailAction } from "@/actions/trails/delete-trail.action";
import { ICreateTrail, IUpdateTrail } from "@/types/Trail";
import { updateTrailAction } from "@/actions/trails/update-trail.action";

export const useTrail = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const queryClient = useQueryClient();

  const { data: trails = [], isFetching: isLoadingPlans } = useQuery({
    queryKey: ["trails"],
    queryFn: getTrails,
  });

  const { mutateAsync: deleteTrailMutation, isPending: isPendingDelete } =
    useMutation({
      mutationFn: (id: string) => deleteTrailAction(id),
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["trails"] });
        showSuccessToast("Trilha excluída com sucesso.");
      },
      onError: (error) => {
        console.log("deu ruim");
        console.log(error.message);
        showErrorToast(error.message);
        throw error;
      },
    });

  const { mutateAsync: createTrailMutation, isPending: isPendingCreate } =
    useMutation({
      mutationFn: (data: ICreateTrail) => createTrailAction(data),
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["trails"] });
        showSuccessToast("Trilha criada com sucesso.", "/admin");
      },
      onError: (error) => {
        showErrorToast(error.message);
        throw error;
      },
    });

  const { mutateAsync: updateTrailMutation, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: Omit<IUpdateTrail, "id">;
      }) => updateTrailAction(id, data),
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["trails"] });
        showSuccessToast("Trilha atualizada com sucesso.", "/admin");
      },
      onError: (error) => {
        showErrorToast(error.message);
        throw error;
      },
    });

  const isLoading = useMemo(
    () =>
      isLoadingPlans || isPendingDelete || isPendingCreate || isPendingUpdate,
    [isLoadingPlans, isPendingDelete, isPendingCreate, isPendingUpdate]
  );

  return {
    trails,
    isLoading,
    deleteTrailMutation,
    createTrailMutation,
    updateTrailMutation,
  };
};
