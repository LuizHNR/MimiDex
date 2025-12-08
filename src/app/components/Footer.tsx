import LogoMimi from "@/Images/Logo/Mimi.png"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    
    return(
        <footer>

            <div className="ParteSuperior">

                <div>
                    <h2>Mimidex</h2>
                    <Image src={LogoMimi} alt="mimi-logo" />
                </div>
                
                <div>

                    <div>
                        <p>Projeto criado sem a visão de lucrar, somente para diversão e uma forma de ajudar a comunidade de pokemon!</p>
                    </div>

                    <div>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li>Usuario</li>
                            <li>Time</li>
                            <li>Regiões</li>
                            <li>Itens</li>
                            <li>Natures</li>
                        </ul>

                    </div>

                </div>
                
                <div>
                    <h2>Me siga</h2>
                    <ul>
                        <li>Linkedin</li>
                        <li>Instagram</li>
                        <li>GitHub</li>
                    </ul>
                 </div>

            </div>

            <div>

                <div>
                    <p>Ultima atualização da pagina: 05 Dezembro de 2025</p>

                    <p>Responsavel pela pagina: Luiz Henrique Neri</p>
                </div>

                <div>
                    <p>Pokemon TCG e suas respectivas propriedades são copyright THE POKEMON COMPANY</p>
                </div>

            </div>

        </footer>
    )
}