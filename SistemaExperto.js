const sintomasUsuario = {
    dolorCabeza: true,
    mareos: true
};

class SistemaExpertoMedico {
    constructor() {
        this.reglas = [
            { sintomas: ["dolorPecho", "palpitaciones", "faltaAire"], especialidad: "Cardiología" },
            { sintomas: ["ronchas", "picazon", "caidaCabello"], especialidad: "Dermatología" },
            { sintomas: ["dolorAbdominal", "acidez", "nauseas"], especialidad: "Gastroenterología" },
            { sintomas: ["dolorMenstrual", "flujoAnormal", "irregularidadCiclo"], especialidad: "Ginecología" },
            { sintomas: ["fiebre", "dolorGeneral", "debilidad"], especialidad: "Medicina General" },
            { sintomas: ["tosCronica", "dificultadRespirar", "dolorPecho"], especialidad: "Neumología" },
            { sintomas: ["dolorCabeza", "perdidaMemoria", "mareos"], especialidad: "Neurología" },
            { sintomas: ["dolorEspalda", "fractura", "esguince"], especialidad: "Traumatología" },
            { sintomas: ["estres", "ansiedad", "depresion"], especialidad: "Psicología" },
            { sintomas: ["dolorPie", "hongosPies", "uñasEngrosadas"], especialidad: "Podología" },
            { sintomas: ["dolorMuelas", "caries", "sangradoEncia"], especialidad: "Odontología" },
            { sintomas: ["visionBorrosa", "dolorOjos", "sequedadOcular"], especialidad: "Oftalmología" },
            { sintomas: ["dolorOido", "perdidaAudicion", "ronquera"], especialidad: "Otorrinolaringología" },
            { sintomas: ["dolorArticulaciones", "dificultadMoverse", "rehabilitacion"], especialidad: "Terapia Física y Rehabilitación" },
            { sintomas: ["dolorRenal", "ardorOrinar", "incontinencia"], especialidad: "Urología" }
        ];
    }

    recomendarEspecialidad(sintomas) {
        let especialidadesRecomendadas = [];
        this.reglas.forEach(regla => {
            if (regla.sintomas.some(sintoma => sintomas[sintoma])) {
                especialidadesRecomendadas.push(regla.especialidad);
            }
        });
        return especialidadesRecomendadas.length > 0 ? especialidadesRecomendadas : ["No se encontró una especialidad adecuada"];
    }
}

const sistema = new SistemaExpertoMedico();
const resultado = sistema.recomendarEspecialidad(sintomasUsuario);
console.log("Debe acudir a: ", resultado.join(", "));
