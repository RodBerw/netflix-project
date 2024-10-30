import Linkedin from "../../public/icons/Linkedin.svg";
import Github from "../../public/icons/Github.svg";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-8 h-16 bg-background text-white">
      <p>Created by Rodolfo Berwanger</p>
      <a
        className="flex gap-2"
        href="https://www.linkedin.com/in/rodolfo-berwanger-liberado-10aa751b4/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin width="25px" height="25px" />
        Linkedin
      </a>
      <a
        className="flex gap-2"
        href="https://github.com/RodBerw"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github width="25px" height="25px" />
        Github
      </a>
    </footer>
  );
}
