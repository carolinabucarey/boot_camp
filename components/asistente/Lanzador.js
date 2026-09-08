import Image from "next/image";
import { AVATARES } from "./constantes";

export default function Lanzador({ onAbrir }) {
  return (
    <button type="button" className="asistente-lanzador" onClick={onAbrir} aria-label="Abrir el asistente de Maile">
      <Image src={AVATARES.lanzador} alt="" width={64} height={64} aria-hidden="true" />
    </button>
  );
}
