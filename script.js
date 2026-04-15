// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let currentUser = null;
let currentSession = 0;
let completedSessions = new Set();
let savedAnswers = {};

// ══════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════

// Panel organisateur commun à chaque session (avant/pendant/après)
function orgPanel(n) {
  return `
    <div class="panel">
      <div class="panel-header gold"><span class="panel-icon">🧭</span><span class="panel-title">Organizador · Reflexión de sesión</span></div>
      <div class="panel-body">
        <div class="question-block">
          <span class="question-label">Antes de empezar</span>
          <p class="question-prompt">¿Qué problema histórico real vamos a analizar hoy?</p>
          <textarea class="answer-field" id="s${n}_org_antes" rows="2" placeholder="Escribe aquí tu respuesta inicial..."></textarea>
        </div>
        <div class="question-block">
          <span class="question-label">Durante</span>
          <p class="question-prompt">¿Qué conceptos del siglo XIII estás aplicando?</p>
          <textarea class="answer-field" id="s${n}_org_durante" rows="2" placeholder="Anota los conceptos que vayas identificando..."></textarea>
        </div>
        <div class="question-block">
          <span class="question-label">Al terminar</span>
          <p class="question-prompt">¿Qué has aprendido sobre la sociedad medieval que no sabías antes?</p>
          <textarea class="answer-field" id="s${n}_org_despues" rows="2" placeholder="Reflexión final de la sesión..."></textarea>
        </div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════
//  SESSION DEFINITIONS (GRUPO CONTROL)
//  Enseñanza expositiva + fuentes primarias
// ══════════════════════════════════════════
const sessions = [

  // ── SESIÓN 1: ALFONSO X Y LA CONSTRUCCIÓN DEL SABER ──
  {
    id: 1,
    title: 'Alfonso X y la construcción del saber',
    type: 'fuentes',
    tag: 'Sesión 1 · Fuentes Primarias',
    desc: 'Prólogo de las Tablas alfonsíes · Intencionalidad histórica',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎯</span><span class="panel-title">Objetivos</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Comprender el papel de Alfonso X el Sabio</li>
            <li>Analizar la intencionalidad histórica de una fuente</li>
            <li>Interpretar una fuente primaria medieval</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📚</span><span class="panel-title">Materiales</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Manual escolar</li>
            <li>Prólogo de las Tablas alfonsíes (abajo)</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📜</span><span class="panel-title">Fuente · Prólogo de las Tablas alfonsíes</span></div>
        <div class="panel-body">
          <div class="source-text">
            "Porque la ciençia de la astrologia es cosa que no se puede averiguar sino por rectificamientos e los rectificamientos que tienen los sabios que cumplen en esta cosa no los puede complir un hombre porque no se puede complir en vida de un hombre. Mas quando se cumple cumplese por obra de muchos hombres obrando uno em pos de otro en luengos tiempos (…).<br><br>
            En esta sason paresçio el reynado fortunado et ayudado de Dios el reyno del muy alto y muy noble señor Rey don Alonso que Dios mantenga. E porque amava los saberes e los preçiava, mandoles haser los ynstrumentos que dixo Ptholomeo en su libro del Almagesto (…).<br><br>
            E mandonos retificar en la çibdad de Toledo ques una de las çibdades prinçipales de España, guardela Dios (…). E posimos nombre a este libro el libro de las tablas alfonsies porque fue fecho y copilado por su mandado."
          </div>
          <p class="source-attr">Prólogo de las Tablas alfonsíes · ca. 1272</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">❓</span><span class="panel-title">Preguntas</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">1. Iniciativas culturales</span>
            <p class="question-prompt">Explica las principales iniciativas culturales de Alfonso X a partir del texto.</p>
            <textarea class="answer-field" id="s1_q1" rows="4" placeholder="Apoya tu explicación en elementos concretos del prólogo..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Objetivos explícitos</span>
            <p class="question-prompt">¿Qué objetivos explícitos aparecen en el prólogo de las Tablas alfonsíes?</p>
            <textarea class="answer-field" id="s1_q2" rows="3" placeholder="Identifica los fines que el propio texto declara..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. Imagen del rey</span>
            <p class="question-prompt">¿Qué imagen del rey se construye en el documento? Justifica con elementos del texto.</p>
            <textarea class="answer-field" id="s1_q3" rows="4" placeholder="Cita palabras o expresiones concretas que apoyen tu análisis..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">4. Papel de los sabios</span>
            <p class="question-prompt">¿Qué papel tienen los sabios según la fuente? ¿Qué nos indica sobre la producción del conocimiento?</p>
            <textarea class="answer-field" id="s1_q4" rows="4" placeholder="Reflexiona sobre colectividad, tiempo y autoridad del saber..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">5. Intencionalidad</span>
            <p class="question-prompt">Analiza la intencionalidad del texto: ¿por qué crees que se escribió este prólogo?</p>
            <textarea class="answer-field" id="s1_q5" rows="4" placeholder="Considera a quién va dirigido y qué busca legitimar..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">6. Limitaciones</span>
            <p class="question-prompt">¿Qué limitaciones tiene esta fuente para conocer la realidad histórica?</p>
            <textarea class="answer-field" id="s1_q6" rows="4" placeholder="Piensa en sesgos, silencios y posición del autor..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He citado elementos concretos del texto en mis respuestas</span></div>
            <div class="check-item"><input type="checkbox"> <span>He distinguido lo que dice el texto de lo que yo interpreto</span></div>
            <div class="check-item"><input type="checkbox"> <span>He identificado al menos una limitación de la fuente</span></div>
          </div>
        </div>
      </div>

      ${orgPanel(1)}
    `
  },

  // ── SESIÓN 2: SABER, PODER Y LEGITIMIDAD ──
  {
    id: 2,
    title: 'Saber, poder y legitimidad',
    type: 'fuentes',
    tag: 'Sesión 2 · Fuentes Primarias',
    desc: 'Siete Partidas · Discurso normativo medieval',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎯</span><span class="panel-title">Objetivos</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Analizar la relación entre conocimiento y poder</li>
            <li>Evaluar un discurso normativo medieval</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📚</span><span class="panel-title">Materiales</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Manual escolar</li>
            <li>Extracto de las Siete Partidas (abajo)</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📜</span><span class="panel-title">Fuente · Siete Partidas</span></div>
        <div class="panel-body">
          <div class="source-text">
            "Et los santos dixeron que el rey es señor puesto en la tierra en lugar de Dios para complir la justicia et dar a cada uno su derecho, et por ende lo llamaron corazón et alma del pueblo; ca así como el alma yace en el corazón del home, et por ella vive el cuerpo et se mantiene, así en el rey yace la justicia, que es vida et mantenimiento del pueblo de su señorío.<br><br>
            Et bien otrosí como el corazón es uno, et por él reciben todos los otros miembros unidat para seer cuerpo, bien así todos los del regno, maguer sean muchos, porque el rey es et debe seer uno, por eso deben otrosí todos seer unos con él para servirle et ayudarle en las cosas que él ha de facer.<br><br>
            Et naturalmente dixieron los sabios que el rey es cabeza del regno; ca así como de la cabeza nacen los sentidos, por que se mandan todos los miembros del cuerpo, bien así por el mandamiento que nace del rey, que es señor et cabeza de todos los del regno, se deben mandar, et guiar et haber un acuerdo con él para obedescerle, et amparar, et guardar et endereszar el regno onde él es alma et cabeza, et ellos los miembros."
          </div>
          <p class="source-attr">Siete Partidas · ca. 1265</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">❓</span><span class="panel-title">Preguntas</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">1. Modelo de rey</span>
            <p class="question-prompt">¿Qué modelo de rey propone el texto?</p>
            <textarea class="answer-field" id="s2_q1" rows="4" placeholder="Describe el modelo y sus fundamentos simbólicos..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Funciones del saber</span>
            <p class="question-prompt">¿Qué funciones cumple el saber según la fuente?</p>
            <textarea class="answer-field" id="s2_q2" rows="3" placeholder="Analiza cómo el saber legitima y orienta el poder..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. Ley y poder</span>
            <p class="question-prompt">¿Qué relación se establece entre ley y poder?</p>
            <textarea class="answer-field" id="s2_q3" rows="3" placeholder="¿La ley emana del rey o lo limita?..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">4. ¿Descriptivo o prescriptivo?</span>
            <p class="question-prompt">¿Este texto describe la realidad o prescribe cómo debería ser? Justifica.</p>
            <textarea class="answer-field" id="s2_q4" rows="4" placeholder="Distingue entre realidad histórica y discurso normativo..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">5. Intereses detrás del discurso</span>
            <p class="question-prompt">¿Qué intereses puede haber detrás de esta visión del poder?</p>
            <textarea class="answer-field" id="s2_q5" rows="4" placeholder="Piensa en el contexto político y las tensiones del s.XIII..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">6. Comparación con la actualidad</span>
            <p class="question-prompt">Compara estas ideas con sistemas políticos actuales (argumenta).</p>
            <textarea class="answer-field" id="s2_q6" rows="4" placeholder="Conecta con modelos democráticos, monárquicos o autoritarios contemporáneos..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He distinguido entre lo descriptivo y lo prescriptivo</span></div>
            <div class="check-item"><input type="checkbox"> <span>He identificado los intereses del discurso</span></div>
            <div class="check-item"><input type="checkbox"> <span>Mi comparación actual es concreta y argumentada</span></div>
          </div>
        </div>
      </div>

      ${orgPanel(2)}
    `
  },

  // ── SESIÓN 3: LENGUA, CULTURA Y PODER ──
  {
    id: 3,
    title: 'Lengua, cultura y poder',
    type: 'fuentes',
    tag: 'Sesión 3 · Fuentes Primarias',
    desc: 'Prólogo de las Cantigas de Santa María · Uso político de la lengua',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎯</span><span class="panel-title">Objetivos</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Interpretar el uso político de la lengua</li>
            <li>Analizar el cambio cultural</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📚</span><span class="panel-title">Materiales</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Manual escolar</li>
            <li>Prólogo de las Cantigas de Santa María (abajo)</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📜</span><span class="panel-title">Fuente · Prólogo de las Cantigas de Santa María</span></div>
        <div class="panel-body">
          <div class="source-text">
            "Este es el prólogo de las Cantigas de Santa María, indicando las cosas que son precisas para bien trovar. Porque trovar es cosa en que yace entendimiento, por eso, quien lo hace ha de tenerlo, y razón bastante, para que entienda y sepa decir (o cantar) lo que entiende y le place expresar, porque el bien trovar así ha de ser hecho.<br><br>
            Y aunque yo estas dos cualidades no tengo tal como tener quisiera, sin embargo, probaré de mostrar en adelante lo poco que sé, confiando en Dios, de donde el saber viene, pues por Él supongo que podré mostrar algo de lo que mostrar quiero.<br><br>
            Y lo que quiero es decir loor de la Virgen, Madre de Nuestro Señor, Santa María, que es lo mejor que Él hizo, y, por esto, yo quiero ser desde hoy trovador suyo, y le ruego que me quiera por su trovador, y que quiera recibir mi trovar, porque por él quiero mostrar los milagros que Ella hizo; y además quiero dejarme de trovar, desde ahora, por otra dama, y pienso recobrar, por ésta, cuanto por las otras perdí.<br><br>
            Por ello, le ruego, si ella quisiere, que le plazca lo que de ella yo dijere en mis cantares, y si a ella le agradara, que me dé un galardón tal como el que ella da a los que ama, y quien lo supiere, con mayor agrado trovará por ella."
          </div>
          <p class="source-attr">Prólogo de las Cantigas de Santa María · ca. 1270-1280</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">❓</span><span class="panel-title">Preguntas</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">1. Razones del uso del romance</span>
            <p class="question-prompt">¿Qué razones da el texto para el uso del romance?</p>
            <textarea class="answer-field" id="s3_q1" rows="4" placeholder="Identifica motivos explícitos e implícitos..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Cambio cultural</span>
            <p class="question-prompt">¿Qué cambio cultural refleja esta decisión?</p>
            <textarea class="answer-field" id="s3_q2" rows="3" placeholder="Relaciona con el contexto lingüístico y religioso del s.XIII..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. Grupos beneficiados</span>
            <p class="question-prompt">¿Qué grupos sociales se benefician de este cambio?</p>
            <textarea class="answer-field" id="s3_q3" rows="3" placeholder="Analiza quién accede al saber y a la cultura gracias al romance..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">4. Imagen del poder</span>
            <p class="question-prompt">¿Qué imagen del poder se proyecta a través de la lengua?</p>
            <textarea class="answer-field" id="s3_q4" rows="4" placeholder="Reflexiona sobre legitimación cultural y política..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">5. Limitaciones de la fuente</span>
            <p class="question-prompt">¿Qué limitaciones tiene esta fuente?</p>
            <textarea class="answer-field" id="s3_q5" rows="3" placeholder="Piensa en quién habla, a quién silencia y qué no dice..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">6. La lengua como instrumento de poder hoy</span>
            <p class="question-prompt">¿Se puede considerar la lengua un instrumento de poder hoy? Argumenta.</p>
            <textarea class="answer-field" id="s3_q6" rows="4" placeholder="Conecta con debates actuales sobre lenguas oficiales, minoritarias, educación..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He identificado motivos tanto culturales como políticos</span></div>
            <div class="check-item"><input type="checkbox"> <span>He pensado en los grupos beneficiados y no beneficiados</span></div>
            <div class="check-item"><input type="checkbox"> <span>Mi conexión con la actualidad es concreta</span></div>
          </div>
        </div>
      </div>

      ${orgPanel(3)}
    `
  },

  // ── SESIÓN 4: LA CIUDAD MEDIEVAL COMO SISTEMA ──
  {
    id: 4,
    title: 'La ciudad medieval como sistema',
    type: 'fuentes',
    tag: 'Sesión 4 · Fuentes Primarias',
    desc: 'Fuero de Sevilla · Regulación social y estructura urbana',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎯</span><span class="panel-title">Objetivos</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Analizar la estructura urbana</li>
            <li>Interpretar la regulación social</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📚</span><span class="panel-title">Materiales</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Manual escolar</li>
            <li>Extracto del Fuero de Sevilla (proporcionado por el profesor)</li>
          </ul>
          <p style="color:#3a2a12;margin-top:0.8rem;font-size:0.95rem;">
            <strong>Contexto:</strong> El Fuero de Sevilla (concedido por Fernando III y confirmado/ampliado por Alfonso X) regulaba la vida urbana tras la conquista cristiana de 1248: oficios, mercados, convivencia entre comunidades, orden público, propiedad, justicia local y deberes de los vecinos.
          </p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">❓</span><span class="panel-title">Preguntas</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;margin-bottom:1rem;font-size:0.95rem;"><em>Responde tras leer el extracto entregado en clase.</em></p>

          <div class="question-block">
            <span class="question-label">1. Aspectos regulados</span>
            <p class="question-prompt">¿Qué aspectos de la vida urbana regula el texto?</p>
            <textarea class="answer-field" id="s4_q1" rows="4" placeholder="Enumera y clasifica los ámbitos regulados..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Problemas de la ciudad medieval</span>
            <p class="question-prompt">¿Qué nos indica esto sobre los problemas de la ciudad medieval?</p>
            <textarea class="answer-field" id="s4_q2" rows="4" placeholder="Infiere qué tensiones o conflictos motivan estas normas..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. Grupos sociales</span>
            <p class="question-prompt">¿Qué grupos sociales aparecen implícita o explícitamente?</p>
            <textarea class="answer-field" id="s4_q3" rows="4" placeholder="Identifica actores sociales, jerarquías y posibles exclusiones..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">4. Finalidad de la regulación</span>
            <p class="question-prompt">¿Qué finalidad tiene la regulación del espacio urbano?</p>
            <textarea class="answer-field" id="s4_q4" rows="4" placeholder="Orden, control, fiscalidad, convivencia..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">5. Visión de la sociedad</span>
            <p class="question-prompt">¿Qué visión de la sociedad transmite el texto?</p>
            <textarea class="answer-field" id="s4_q5" rows="4" placeholder="¿Sociedad jerárquica, corporativa, abierta...? Justifica..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">6. Comparación con una ciudad actual</span>
            <p class="question-prompt">Compara este modelo con una ciudad actual.</p>
            <textarea class="answer-field" id="s4_q6" rows="4" placeholder="Continuidades y rupturas: normativa municipal, diversidad, servicios..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He identificado al menos tres grupos sociales</span></div>
            <div class="check-item"><input type="checkbox"> <span>He inferido los problemas a partir de las normas</span></div>
            <div class="check-item"><input type="checkbox"> <span>Mi comparación con la ciudad actual es específica</span></div>
          </div>
        </div>
      </div>

      ${orgPanel(4)}
    `
  },

  // ── SESIÓN 5: GUERRA, ECONOMÍA Y LEGITIMACIÓN ──
  {
    id: 5,
    title: 'Guerra, economía y legitimación',
    type: 'fuentes',
    tag: 'Sesión 5 · Fuentes Primarias',
    desc: 'Crónica de Alfonso X — toma de Niebla (1262) · Discurso histórico',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎯</span><span class="panel-title">Objetivos</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Analizar el impacto económico de la guerra</li>
            <li>Evaluar el discurso histórico</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📚</span><span class="panel-title">Materiales</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>Manual escolar</li>
            <li>Crónica de Alfonso X — toma de Niebla (abajo)</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📜</span><span class="panel-title">Fuente · Crónica de Alfonso X (toma de Niebla, 1262)</span></div>
        <div class="panel-body">
          <div class="source-text">
            "El rey don Alfonso dio a aquel rey Abén Mafod tierra en que viviese para en toda su vida: el lugar del Algaña, cerca de Sevilla, con todos los derechos que allí había el rey, y el diezmo del aceite. Le dio la huerta de Sevilla que llaman la Huerta del Rey y cantidades ciertas de maravedís en la Judería de Sevilla.<br><br>
            Con esto, Abén Mafod tuvo mantenimiento honrado en toda su vida. Y algunos lugares de los que el rey ganó dejó poblados de moros. Después que hubo ganado Niebla, cobró todo el Algarbe: Niebla con sus términos, Gibraleón, Huelva, Serpa, Moura, Alcatín, Castro Marín, Tavira, Faro y Loulé."
          </div>
          <p class="source-attr">Crónica de Alfonso X · toma de Niebla (1262) · Ed. Manuel González Jiménez, citada por Alejandro García Sanjuán</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">❓</span><span class="panel-title">Preguntas</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">1. Obtención del botín</span>
            <p class="question-prompt">¿Cómo se describe la obtención del botín?</p>
            <textarea class="answer-field" id="s5_q1" rows="4" placeholder="Identifica el tono y los términos usados para describir la conquista..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Lo destacado y lo omitido</span>
            <p class="question-prompt">¿Qué elementos se destacan y cuáles se omiten?</p>
            <textarea class="answer-field" id="s5_q2" rows="4" placeholder="Presta atención a los silencios del texto: víctimas, violencia, población..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. Imagen de la guerra</span>
            <p class="question-prompt">¿Qué imagen de la guerra transmite el texto?</p>
            <textarea class="answer-field" id="s5_q3" rows="4" placeholder="¿Guerra legítima, ordenada, generosa...? Justifica con el texto..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">4. Intención de justificar</span>
            <p class="question-prompt">¿Crees que hay una intención de justificar los hechos? Argumenta.</p>
            <textarea class="answer-field" id="s5_q4" rows="4" placeholder="Analiza el trato a Abén Mafod y la enumeración de conquistas..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">5. Limitaciones de la fuente</span>
            <p class="question-prompt">¿Qué limitaciones presenta esta fuente histórica?</p>
            <textarea class="answer-field" id="s5_q5" rows="4" placeholder="Autor, punto de vista, distancia temporal, sesgos..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">6. Relación con la actualidad</span>
            <p class="question-prompt">Relaciona este tipo de prácticas con ejemplos actuales.</p>
            <textarea class="answer-field" id="s5_q6" rows="4" placeholder="Reparto de territorios tras conflictos, pactos con élites locales, legitimación mediática..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He identificado al menos un silencio significativo del texto</span></div>
            <div class="check-item"><input type="checkbox"> <span>He argumentado sobre la intencionalidad con elementos del texto</span></div>
            <div class="check-item"><input type="checkbox"> <span>Mi ejemplo actual es concreto y pertinente</span></div>
          </div>
        </div>
      </div>

      ${orgPanel(5)}
    `
  },

  // ── SESIÓN 6: DISCUSIÓN (GRUPO FOCAL) ──
  {
    id: 6,
    title: 'Discusión · Grupo focal',
    type: 'fuentes',
    tag: 'Sesión 6 · Grupo focal',
    desc: 'Percepción del trabajo con fuentes históricas',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎯</span><span class="panel-title">Objetivo</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;font-size:0.98rem;line-height:1.6;">
            Obtener tu percepción sobre la forma en que habéis trabajado la historia durante las cinco sesiones anteriores. <strong>No hay respuestas correctas</strong>: se trata de recoger tu opinión sincera.
          </p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">💬</span><span class="panel-title">Preguntas guía</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">1. Forma de trabajar</span>
            <p class="question-prompt">¿Cómo describiríais la forma en que habéis trabajado la historia en estas sesiones?</p>
            <textarea class="answer-field" id="s6_q1" rows="4" placeholder="Describe el tipo de actividades, el ritmo, la dinámica..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Dificultades con las fuentes</span>
            <p class="question-prompt">¿Qué dificultades habéis encontrado al trabajar con fuentes históricas?</p>
            <textarea class="answer-field" id="s6_q2" rows="4" placeholder="Lenguaje, contexto, interpretación, extensión..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. ¿Analizar documentos ayuda a comprender el pasado?</span>
            <p class="question-prompt">¿Creéis que analizar documentos os ayuda a comprender mejor el pasado? ¿Por qué?</p>
            <textarea class="answer-field" id="s6_q3" rows="4" placeholder="Argumenta desde tu experiencia personal en las sesiones..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">4. Actividades más útiles</span>
            <p class="question-prompt">¿Qué tipo de actividades os ayudan más a aprender historia?</p>
            <textarea class="answer-field" id="s6_q4" rows="4" placeholder="Lectura, debate, escritura, comparación, audiovisual..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">5. Materiales o enfoques que echáis en falta</span>
            <p class="question-prompt">¿Echáis en falta algún tipo de material o enfoque?</p>
            <textarea class="answer-field" id="s6_q5" rows="4" placeholder="¿Mapas, vídeos, visitas, narrativas, objetos...?"></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">6. Mejoras</span>
            <p class="question-prompt">¿Cómo mejoraríais estas clases?</p>
            <textarea class="answer-field" id="s6_q6" rows="4" placeholder="Propuestas concretas de mejora..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He respondido con sinceridad a todas las preguntas</span></div>
            <div class="check-item"><input type="checkbox"> <span>He dado ejemplos concretos de las sesiones</span></div>
            <div class="check-item"><input type="checkbox"> <span>Mis propuestas de mejora son realistas</span></div>
          </div>
        </div>
      </div>

      ${orgPanel(6)}
    `
  }
];

// ══════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════
function handleLogin() {
  const code = document.getElementById('code-input').value.trim().toUpperCase();
  if (!code || code.length < 3) {
    document.getElementById('login-error').style.display = 'block';
    return;
  }
  currentUser = code;
  savedAnswers = JSON.parse(localStorage.getItem('dh_ctrl_answers_' + code) || '{}');
  completedSessions = new Set(JSON.parse(localStorage.getItem('dh_ctrl_done_' + code) || '[]'));

  document.getElementById('header-code').textContent = '📎 ' + code;
  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-app').classList.add('active');
  updateProgress();
  goSession(1);
}

function handleLogout() {
  currentUser = null;
  document.getElementById('screen-app').classList.remove('active');
  document.getElementById('screen-login').classList.add('active');
  document.getElementById('code-input').value = '';
  document.getElementById('login-error').style.display = 'none';
}

// ══════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════
function goSession(idx) {
  if (!currentUser) return;
  saveCurrentAnswers();
  currentSession = idx;

  document.querySelectorAll('.session-btn').forEach(btn => btn.classList.remove('active'));
  sessions.forEach(s => {
    const btn = document.getElementById('nav-' + s.id);
    if (!btn) return;
    if (completedSessions.has(s.id)) btn.classList.add('done');
    else btn.classList.remove('done');
  });
  document.getElementById('nav-' + idx)?.classList.add('active');

  renderSession(idx);
  document.getElementById('content-area').scrollTop = 0;
}

function renderSession(idx) {
  const s = sessions.find(s => s.id === idx);
  const area = document.getElementById('content-area');
  const tagClass = s.type === 'novela' ? 'tag-novela' : s.type === 'fuentes' ? 'tag-fuentes' : 'tag-intro';

  area.innerHTML = `
    <div class="session-card">
      <div class="session-header">
        <span class="session-tag ${tagClass}">${s.tag}</span>
        <h2 class="session-title">${s.title}</h2>
        <p class="session-desc">${s.desc}</p>
      </div>
      ${completedSessions.has(idx) ? renderSuccess(idx) : s.render() + renderSubmitArea(idx)}
    </div>
  `;

  restoreAnswers();
}

function renderSubmitArea(idx) {
  return `
    <div class="submit-area">
      <span class="submit-info">Revisa la autoevaluación antes de enviar. Tu código: <strong>${currentUser}</strong></span>
      <button class="btn-submit" onclick="submitSession(${idx})">Entregar sesión ${idx} →</button>
    </div>`;
}

function renderSuccess(idx) {
  const nextIdx = idx < 6 ? idx + 1 : null;
  return `
    <div class="success-panel">
      <div class="success-icon">✦</div>
      <h3 class="success-title">Sesión ${idx} entregada</h3>
      <p class="success-msg">Tus respuestas han quedado registradas con el código <strong>${currentUser}</strong>.<br>El profesor podrá revisarlas en el panel de investigación.</p>
      ${nextIdx ? `<button class="btn-next" onclick="goSession(${nextIdx})">Continuar a Sesión ${nextIdx} →</button>` : '<p style="color:var(--gold);font-family:\'Cinzel\',serif;font-size:0.9rem;">¡Has completado toda la secuencia!</p>'}
    </div>
  `;
}

// ══════════════════════════════════════════
//  ANSWERS
// ══════════════════════════════════════════
function saveCurrentAnswers() {
  if (!currentUser) return;

  document.querySelectorAll('#content-area [id]').forEach(el => {
    if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type !== 'radio' && el.type !== 'checkbox')) {
      savedAnswers[el.id] = el.value;
    }
  });

  document.querySelectorAll('#content-area input[type="radio"]:checked').forEach(el => {
    if (el.name) savedAnswers[el.name] = el.value;
  });

  const selectedRole = document.querySelector('#content-area .role-card.selected');
  if (selectedRole) {
    const roleInput = selectedRole.querySelector('input');
    if (roleInput && roleInput.name) savedAnswers[roleInput.name] = roleInput.value;
  }

  const checkboxNames = new Set();
  document.querySelectorAll('#content-area input[type="checkbox"][name]').forEach(el => {
    checkboxNames.add(el.name);
  });
  checkboxNames.forEach(name => {
    const checked = [];
    document.querySelectorAll(`#content-area input[type="checkbox"][name="${name}"]:checked`).forEach(el => {
      const label = el.closest('.option-item')?.querySelector('.option-text');
      if (label) checked.push(label.textContent.trim());
    });
    savedAnswers[name] = checked.join('; ');
  });

  localStorage.setItem('dh_ctrl_answers_' + currentUser, JSON.stringify(savedAnswers));
}

function restoreAnswers() {
  setTimeout(() => {
    Object.keys(savedAnswers).forEach(key => {
      const el = document.getElementById(key);
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = savedAnswers[key];
      }

      const radio = document.querySelector(`#content-area input[type="radio"][name="${key}"][value="${savedAnswers[key]}"]`);
      if (radio) radio.checked = true;

      const group = document.querySelectorAll(`#content-area input[type="checkbox"][name="${key}"]`);
      if (group.length > 0 && savedAnswers[key]) {
        const saved = savedAnswers[key].split('; ').filter(Boolean);
        group.forEach(cb => {
          const span = cb.closest('.option-item')?.querySelector('.option-text');
          if (span && saved.includes(span.textContent.trim())) cb.checked = true;
        });
      }
    });
  }, 50);
}

// ══════════════════════════════════════════
//  GOOGLE SHEETS INTEGRATION
// ══════════════════════════════════════════
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxz0MOeMJX9mUPIve-AfdNIP2Zt3ELjIW3lR92lYl5J5TEv5Gnru2Lsay8dyINoUPyy/exec';

const QUESTION_LABELS = {
  // Sesión 1 — Alfonso X y la construcción del saber
  s1_q1:           'S1 · 1. Iniciativas culturales de Alfonso X',
  s1_q2:           'S1 · 2. Objetivos explícitos del prólogo',
  s1_q3:           'S1 · 3. Imagen del rey en el documento',
  s1_q4:           'S1 · 4. Papel de los sabios y producción del conocimiento',
  s1_q5:           'S1 · 5. Intencionalidad del texto',
  s1_q6:           'S1 · 6. Limitaciones de la fuente',
  s1_org_antes:    'S1 · Organizador — Antes de empezar',
  s1_org_durante:  'S1 · Organizador — Durante',
  s1_org_despues:  'S1 · Organizador — Al terminar',

  // Sesión 2 — Saber, poder y legitimidad
  s2_q1:           'S2 · 1. Modelo de rey que propone el texto',
  s2_q2:           'S2 · 2. Funciones del saber según la fuente',
  s2_q3:           'S2 · 3. Relación entre ley y poder',
  s2_q4:           'S2 · 4. ¿Descriptivo o prescriptivo? Justificación',
  s2_q5:           'S2 · 5. Intereses detrás de esta visión del poder',
  s2_q6:           'S2 · 6. Comparación con sistemas políticos actuales',
  s2_org_antes:    'S2 · Organizador — Antes de empezar',
  s2_org_durante:  'S2 · Organizador — Durante',
  s2_org_despues:  'S2 · Organizador — Al terminar',

  // Sesión 3 — Lengua, cultura y poder
  s3_q1:           'S3 · 1. Razones para el uso del romance',
  s3_q2:           'S3 · 2. Cambio cultural que refleja',
  s3_q3:           'S3 · 3. Grupos sociales beneficiados',
  s3_q4:           'S3 · 4. Imagen del poder a través de la lengua',
  s3_q5:           'S3 · 5. Limitaciones de la fuente',
  s3_q6:           'S3 · 6. La lengua como instrumento de poder hoy',
  s3_org_antes:    'S3 · Organizador — Antes de empezar',
  s3_org_durante:  'S3 · Organizador — Durante',
  s3_org_despues:  'S3 · Organizador — Al terminar',

  // Sesión 4 — La ciudad medieval como sistema
  s4_q1:           'S4 · 1. Aspectos de la vida urbana regulados',
  s4_q2:           'S4 · 2. Problemas de la ciudad medieval',
  s4_q3:           'S4 · 3. Grupos sociales implícitos o explícitos',
  s4_q4:           'S4 · 4. Finalidad de la regulación del espacio urbano',
  s4_q5:           'S4 · 5. Visión de la sociedad transmitida',
  s4_q6:           'S4 · 6. Comparación con una ciudad actual',
  s4_org_antes:    'S4 · Organizador — Antes de empezar',
  s4_org_durante:  'S4 · Organizador — Durante',
  s4_org_despues:  'S4 · Organizador — Al terminar',

  // Sesión 5 — Guerra, economía y legitimación
  s5_q1:           'S5 · 1. Descripción de la obtención del botín',
  s5_q2:           'S5 · 2. Elementos destacados y omitidos',
  s5_q3:           'S5 · 3. Imagen de la guerra transmitida',
  s5_q4:           'S5 · 4. Intención de justificar los hechos',
  s5_q5:           'S5 · 5. Limitaciones de la fuente histórica',
  s5_q6:           'S5 · 6. Relación con ejemplos actuales',
  s5_org_antes:    'S5 · Organizador — Antes de empezar',
  s5_org_durante:  'S5 · Organizador — Durante',
  s5_org_despues:  'S5 · Organizador — Al terminar',

  // Sesión 6 — Discusión (grupo focal)
  s6_q1:           'S6 · 1. Forma en que habéis trabajado la historia',
  s6_q2:           'S6 · 2. Dificultades al trabajar con fuentes históricas',
  s6_q3:           'S6 · 3. ¿Analizar documentos ayuda a comprender el pasado?',
  s6_q4:           'S6 · 4. Actividades que más ayudan a aprender historia',
  s6_q5:           'S6 · 5. Materiales o enfoques que echáis en falta',
  s6_q6:           'S6 · 6. Cómo mejoraríais estas clases',
  s6_org_antes:    'S6 · Organizador — Antes de empezar',
  s6_org_durante:  'S6 · Organizador — Durante',
  s6_org_despues:  'S6 · Organizador — Al terminar'
};

async function sendToSheets(code, sessionIdx, answers) {
  const prefix = `s${sessionIdx}_`;
  const sessionAnswers = {};
  const sessionLabels = {};

  Object.keys(answers).forEach(k => {
    if (k.startsWith(prefix)) {
      sessionAnswers[k] = answers[k];
      if (QUESTION_LABELS[k]) sessionLabels[k] = QUESTION_LABELS[k];
    }
  });

  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        code,
        session: 'Control · Sesión ' + sessionIdx,
        answers: sessionAnswers,
        questionLabels: sessionLabels
      })
    });
    return true;
  } catch (err) {
    console.error('Error enviando a Sheets:', err);
    return false;
  }
}

async function submitSession(idx) {
  saveCurrentAnswers();

  const btn = document.querySelector('.btn-submit');
  if (btn) {
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }

  await sendToSheets(currentUser, idx, savedAnswers);

  completedSessions.add(idx);
  localStorage.setItem('dh_ctrl_done_' + currentUser, JSON.stringify([...completedSessions]));
  updateProgress();
  renderSession(idx);
  document.getElementById('nav-' + idx)?.classList.add('done');
}

function updateProgress() {
  const pct = (completedSessions.size / 6) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
}

// ══════════════════════════════════════════
//  ROLE CARDS (no se usan en el grupo control, pero se mantiene la función)
// ══════════════════════════════════════════
function selectRole(el) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// ══════════════════════════════════════════
//  EXPOSITION GLOBALE
// ══════════════════════════════════════════
window.goSession     = goSession;
window.submitSession = submitSession;
window.selectRole    = selectRole;
window.handleLogout  = handleLogout;

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.getElementById('code-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});
document.getElementById('btn-login').addEventListener('click', handleLogin);
