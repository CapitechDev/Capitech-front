import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaRoute } from "react-icons/fa";

export default function Vestibular() {
  return (
    <main>
      <section className="relative bg-capi_yellow flex items-center justify-center gap-8 p-8">
        <img
          alt="Ícone de contato."
          className="hidden absolute left-28 w-16 sm:block"
          src="/assets/vestibular/vestibularIcon.png"
        />
        <h2 className="font-headline font-semibold text-white text-4xl">
          Vestibular FATEC
        </h2>
      </section>

      <section className="container mx-auto max-w-5xl p-10 px-4">
        <h3 className="text-center font-headline font-bold text-2xl mb-5">
          Siga seu sonho e entre em uma faculdade GRÁTIS!
        </h3>

        <h4 className="text-center font-headline text-md mb-5 sm:text-lg">
          Aqui damos algumas dicas do vestibular e ajudamos na prova.
        </h4>

        <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
          <div className="basis-full md:basis-1/2">
            <MapEmbed />
          </div>

          <div className="basis-full md:basis-1/2">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-justify text-md sm:text-left sm:text-lg border bg-zinc-200 px-10 py-7 rounded-3xl mt-2">
                <p>
                  A Faculdade de Tecnologia (Fatec) chegou na cidade de
                  Votorantim em dezembro de 2022, sendo a primeira unidade da
                  instituição no município. Ela está localizada na Avenida
                  Juscelino Kubitschek de Oliveira, 279, na Vila Protestantes.
                </p>
                <div className="mt-2 space-y-3">
                  <p>Atualmente, a unidade oferece três cursos:</p>
                  <li>
                    <Link
                      href="https://fatecvotorantim.cps.sp.gov.br/desenvolvimento-de-software-multiplataforma/"
                      target="_blank"
                    >
                      Desenvolvimento de Software Multiplataforma
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://fatecvotorantim.cps.sp.gov.br/controle-de-obras/"
                      target="_blank"
                    >
                      Controle de Obras
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://fatecvotorantim.cps.sp.gov.br/ciencia-de-dados-para-negocios/"
                      target="_blank"
                    >
                      Ciencia de Dados para Negócios
                    </Link>
                  </li>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-evenly items-center gap-8 md:flex-row">
          <Button
            className="bg-red-600 text-white font-bold"
            href="https://www.cps.sp.gov.br/fatec/vestibular/"
            as={Link}
            target="_blank"
          >
            Inscreva-se no Vestibular FATEC!
          </Button>
        </div>
      </section>
    </main>
  );
}

function MapEmbed() {
  // Coordenadas (Geo URI)
  const lat = -23.531103780833245;
  const lon = -47.44935779113196;
  const delta = 0.0012; // enquadramento mais apertado

  const minLon = lon - delta;
  const minLat = lat - delta;
  const maxLon = lon + delta;
  const maxLat = lat + delta;

  const bbox = `${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}`;
  const marker = `${lat}%2C${lon}`;

  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
  const osmOpen = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=19/${lat}/${lon}`;
  const gmapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  //const geoUri = `geo:${lat},${lon}?z=19`;

  return (
    // em mobile manter altura fixa (h-64), em md+ ocupar a altura do pai (md:h-full)
    <div className="relative h-64 md:h-full">
      {/* mapa responsivo, bordas arredondadas e sombra suave */}
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
        <iframe
          title="Mapa Fatec Votorantim"
          src={osmEmbed}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>

      {/* marcador visual central (apenas indicador visual, não interfere no iframe) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="block w-4 h-4 bg-red-600 rounded-full shadow-lg animate-pulse" />
      </div>

      {/* overlay compacta de ações (clean, leve) */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <a
          href={osmOpen}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-xs font-medium text-gray-700 hover:bg-white"
          aria-label="Abrir no OpenStreetMap"
        >
          <FaExternalLinkAlt className="text-sm" />
          OSM
        </a>

        <a
          href={gmapsDirections}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-capi_green text-white rounded-lg shadow-sm text-xs font-medium hover:bg-capi_green/90"
          aria-label="Traçar rota"
        >
          <FaRoute className="text-sm" />
          Rota
        </a>

      </div>
    </div>
  );
}
