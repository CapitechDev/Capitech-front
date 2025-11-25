"use client";

import { useFormik } from "formik";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

import { ICreateTrail } from "@/types/Trail";
import { createTrailSchema } from "@/validations/trail.schema";
import { MarkdownEditor } from "@/components/UI/molecules/managePostForm";
import { useTrail } from "@/hooks/useTrail";

export default function AdminCreateTrail() {
  const { createTrailMutation } = useTrail();

  const formik = useFormik<ICreateTrail>({
    initialValues: {
      name: "",
      description: "",
      references: "",
      subtitle: "",
      video_description: "",
      video_title: "",
      iframe_references: "",
    },
    validationSchema: createTrailSchema,
    onSubmit: async (values) => {
      try {
        await createTrailMutation(values);
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });

  return (
    <main>
      <section className="container mx-auto max-w-5xl p-10 px-2">
        <h2 className="text-center font-headline font-semibold text-2xl">
          Cadastrar nova trilha:
        </h2>
        <form
          className="mt-12 flex flex-col items-center gap-8"
          onSubmit={formik.handleSubmit}
        >
          <Input
            className="text-black"
            color="default"
            errorMessage={formik.touched.name && formik.errors.name}
            isInvalid={formik.touched.name && !!formik.errors.name}
            label="Nome"
            labelPlacement="outside"
            name="name"
            placeholder="Digite o título da Trilha"
            size="lg"
            type="text"
            value={formik.values.name}
            variant="faded"
            onChange={formik.handleChange}
          />
          <Input
            color="default"
            errorMessage={formik.touched.subtitle && formik.errors.subtitle}
            isInvalid={formik.touched.subtitle && !!formik.errors.subtitle}
            label="Tema"
            labelPlacement="outside"
            name="subtitle"
            placeholder="Digite o tema"
            size="lg"
            type="text"
            value={formik.values.subtitle}
            variant="faded"
            onChange={formik.handleChange}
          />

          <MarkdownEditor
            labelText="Conteúdo"
            disabled={false}
            textAreaName="description"
            value={formik.values.description}
            setValue={(value) => formik.setFieldValue("description", value)}
            errorMessage={
              formik.touched.description ? formik.errors.description : undefined
            }
            isInvalid={
              formik.touched.description && !!formik.errors.description
            }
          />

          <Input
            color="default"
            errorMessage={
              formik.touched.video_title && formik.errors.video_title
            }
            isInvalid={
              formik.touched.video_title && !!formik.errors.video_title
            }
            label="Título do Vídeo"
            labelPlacement="outside"
            name="video_title"
            placeholder="Digite o título do vídeo"
            size="lg"
            type="text"
            value={formik.values.video_title}
            variant="faded"
            onChange={formik.handleChange}
          />

          <Textarea
            disableAutosize
            classNames={{
              base: "w-full",
              input: "resize-y min-h-[80px]",
            }}
            errorMessage={
              formik.touched.video_description &&
              formik.errors.video_description
            }
            isInvalid={
              formik.touched.video_description &&
              !!formik.errors.video_description
            }
            label="Descrição do Vídeo"
            labelPlacement="outside"
            name="video_description"
            placeholder="Digite a descrição do vídeo"
            value={formik.values.video_description}
            variant="faded"
            onChange={formik.handleChange}
          />

          <Input
            color="default"
            errorMessage={formik.touched.references && formik.errors.references}
            isInvalid={formik.touched.references && !!formik.errors.references}
            label="Referências do Vídeo"
            labelPlacement="outside"
            name="references"
            placeholder="Digite as referências do vídeo"
            size="lg"
            type="text"
            value={formik.values.references}
            variant="faded"
            onChange={formik.handleChange}
          />

          <Input
            color="default"
            errorMessage={
              formik.touched.iframe_references &&
              formik.errors.iframe_references
            }
            isInvalid={
              formik.touched.iframe_references &&
              !!formik.errors.iframe_references
            }
            label="Referências do Iframe"
            labelPlacement="outside"
            name="iframe_references"
            placeholder="Digite as referências do iframe"
            size="lg"
            type="text"
            value={formik.values.iframe_references}
            variant="faded"
            onChange={formik.handleChange}
          />

          <Button color="primary" isLoading={formik.isSubmitting} type="submit">
            Enviar
          </Button>
        </form>
      </section>
    </main>
  );
}
