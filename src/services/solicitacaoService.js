import iluminacaoService from "./iluminacaoService";
import pracaService from "./pracaService";
import pavimentacaoService from "./pavimentacaoService";
import fiscInstalacaoService from "./fiscInstalacaoService";
import monumentoChafarizService from "./monumentoChafarizService";
import viasPublicasService from "./viasPublicasService";
import limpezaTerrenoService from "./limpezaTerrenoService";
import limpezaPiscinaService from "./limpezaPiscinaService";
import radarDengueService from "./radarDengueService";
import focoEscorpiaoService from "./focoEscorpiaoService";
import leishmanioseService from "./leishmanioseService";
import insetosService from "./insetosService";
import animaisAbandonadosService from "./animaisAbandonadosService";
import animaisSinantropicosService from "./animaisSinantropicosService";
import animaisGrandesService from "./animaisGrandesService";
import animaisPerdidosService from "./animaisPerdidosService";
import adocaoAnimaisService from "./adocaoAnimaisService";
import mausTratosAnimaisService from "./mausTratosAnimaisService";
import adocaoAreasService from "./adocaoAreasService";
import locaisUteisService from "./locaisUteisService";
import telefonesUteisService from "./telefonesUteisService";
import tumulosService from "./tumulosService";


const typeService = (type) => {
    switch (type) {
        case "Iluminação pública":
            return iluminacaoService
        case "Pavimentação":
            return pavimentacaoService
        case "Fiscalização de Instalações":
            return fiscInstalacaoService
        case "Monumentos e Chafarizes":
            return monumentoChafarizService
        case "Vias Públicas":
            return viasPublicasService
        case "Pontes em Estradas Rurais":
            return
        case "Parques":
            return pracaService
        case "Praças":
            return
        case "Resíduos Sólidos":
            return
        case "Animais Mortos":
            return
        case "Limpeza de Terreno":
            return limpezaTerrenoService
        case "Limpeza de Piscina":
            return limpezaPiscinaService
        case "Restaurantes e Ambientes":
            return
        case "Radar da Dengue":
            return radarDengueService
        case "Foco de Escorpião":
            return focoEscorpiaoService
        case "Leishmaniose":
            return leishmanioseService
        case "Insetos, roedores, etc...":
            return insetosService
        case "Animais abandonado":
            return animaisAbandonadosService
        case "Animais sinantrópicos":
            return animaisSinantropicosService
        case "Captura de animais de grande porte":
            return animaisGrandesService //////
        case "Animais Perdidos":
            return animaisPerdidosService
        case "Adoção de animais":
            return adocaoAnimaisService
        case "Denúncia de maus tratos de animais":
            return mausTratosAnimaisService
        case "Adoção de Áreas públicas":
            return adocaoAreasService
        case "Indicadores de poluição":
            return
        case "Coleta de Lixo / Coleta seletiva":
            return
        case "Animais Silvestres":
            return
        case "Danos à Fauna":
            return
        case "Cadastro de árvores":
            return
        case "Locais úteis ao cidadão":
            return locaisUteisService
        case "Telefones Úteis":
            return telefonesUteisService
        case "Programação Cultural":
            return
        case "Túmulos de falecidos":
            return tumulosService
        case "Feiras Livres":
            return
        case "Cadastro de Diaristas":
            return
        case "Moradores de Rua":
            return
        case "Cadastro":
            return
        case "Descarte Solidário":
            return
        case "Denúncia de violência doméstica":
            return
        case "Ocorrência de Acidentes":
            return
        case "Ocorrência de Furtos/Roubos":
            return
        case "Mulheres":
            return
        case "Idosos":
            return
        case "Conheça os Gestores":
            return
        case "Consultar Propostas":
            return
        case "Central Anticorrupção":
            return
        case "Notícias":
            return
        case "Sugestões":
            return
        case "Rotas dos guardas":
            return
        case "Trânsito":
            return
        case "Rota de Veículos":
            return
        case "Cartão fidelidade":
            return
        case "Ofertas Locais":
            return


    }
}

export { typeService } 