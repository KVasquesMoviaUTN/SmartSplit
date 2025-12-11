import { create } from 'zustand';

export type LanguageCode =
    | 'en' // English
    | 'zh' // Chinese
    | 'hi' // Hindi
    | 'es' // Spanish
    | 'fr' // French
    | 'ar' // Arabic
    | 'bn' // Bengali
    | 'ru' // Russian
    | 'pt' // Portuguese
    | 'id'; // Indonesian

interface LanguageState {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    // Simple Translation Helpers
    t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

export const LANGUAGES: Record<LanguageCode, string> = {
    en: 'English',
    zh: '中文 (Chinese)',
    hi: 'हिन्दी (Hindi)',
    es: 'Español (Spanish)',
    fr: 'Français (French)',
    ar: 'العربية (Arabic)',
    bn: 'বাংলা (Bengali)',
    ru: 'Русский (Russian)',
    pt: 'Português (Portuguese)',
    id: 'Bahasa Indonesia',
};

// Dictionary
// In a real app this would be split into files, but for a single page app this is efficient.
const TRANSLATIONS = {
    en: {
        appTitle: 'Smart Split',
        subtitle: 'Advanced Hypertrophy Tracker',
        systemStress: 'System Stress',
        addExercise: 'Add Exercise',
        addToWorkout: 'Add to Workout',
        currentSession: 'Current Session',
        noExercises: 'No exercises added yet.',
        howItWorks: 'How it works',
        howItWorksText: 'Select an exercise and add it to your session. The body map will visualize the cumulative stress on each muscle group. Green indicates stimulus, Yellow indicates fatigue, Red indicates overtraining risk.',
        muscleActivation: 'Muscle Activation',
        front: 'Front',
        back: 'Back',
        low: 'Low',
        med: 'Med',
        high: 'High',
        exercise: 'Exercise',
        sets: 'Sets',
        reps: 'Reps',
        suggestions: 'Suggestions',
        bestExercisesFor: 'Best exercises for',
        noExercisesFound: 'No specific exercises found for this muscle group.',

        // Exercise Names
        exercise_bench_press: 'Bench Press',
        exercise_squat: 'Squat',
        exercise_deadlift: 'Deadlift',
        exercise_pull_up: 'Pull Up',
        exercise_overhead_press: 'Overhead Press',
        exercise_barbell_row: 'Barbell Row',
        exercise_dumbbell_curl: 'Dumbbell Curl',
        exercise_tricep_extension: 'Tricep Extension',
        exercise_leg_curl: 'Leg Curl',
        exercise_leg_extension: 'Leg Extension',
        exercise_crunch: 'Crunch',
        exercise_side_plank: 'Side Plank',
        exercise_lateral_raise: 'Lateral Raise',
        exercise_reverse_fly: 'Reverse Fly',
        exercise_push_up: 'Push Up',
        exercise_incline_bench_press: 'Incline Bench Press',
        exercise_dip: 'Dip',
        exercise_lat_pulldown: 'Lat Pulldown',
        exercise_face_pull: 'Face Pull',
        exercise_lunge: 'Lunge',
        exercise_calf_raise: 'Calf Raise',
        exercise_hammer_curl: 'Hammer Curl',
        exercise_skull_crusher: 'Skull Crusher',
        exercise_plank: 'Plank',

        // Instructions
        instruction_bench_press: 'Lie on bench, lower bar to chest, press up.',
        instruction_squat: 'Feet shoulder-width, lower hips until parallel, stand up.',
        instruction_deadlift: 'Lift bar from ground keeping back straight, stand tall.',
        instruction_pull_up: 'Hang from bar, pull chin over bar, lower down.',
        instruction_overhead_press: 'Press bar from shoulders to overhead lock out.',
        instruction_barbell_row: 'Bent over, pull bar to lower chest, lower slowly.',
        instruction_dumbbell_curl: 'Curl dumbbell towards shoulder, lower with control.',
        instruction_tricep_extension: 'Extend arm overhead or pushdown to isolate triceps.',
        instruction_leg_curl: 'Curl legs against resistance to target hamstrings.',
        instruction_leg_extension: 'Extend legs against resistance to target quads.',
        instruction_crunch: 'Lie on back, curl upper body towards knees.',
        instruction_side_plank: 'Support body on one forearm and side of foot, hold.',
        instruction_lateral_raise: 'Raise dumbbells to the sides until shoulder height.',
        instruction_reverse_fly: 'Bent over, raise dumbbells to sides to target rear delts.',
        instruction_push_up: 'Lower body until chest nearly touches floor, push back up.',
        instruction_incline_bench_press: 'Press weight on incline bench to target upper chest.',
        instruction_dip: 'Lower body on parallel bars until elbows are 90 degrees, push up.',
        instruction_lat_pulldown: 'Pull bar down to upper chest, squeeze lats.',
        instruction_face_pull: 'Pull rope towards face, separating hands, squeezing rear delts.',
        instruction_lunge: 'Step forward, lower hips until knees are 90 degrees.',
        instruction_calf_raise: 'Raise heels off the ground, pause, lower slowly.',
        instruction_hammer_curl: 'Curl dumbbells with neutral grip (palms facing each other).',
        instruction_skull_crusher: 'Lie back, lower weight to forehead bending only elbows.',
        instruction_plank: 'Hold push-up position on forearms, keep body straight.',
    },
    zh: {
        appTitle: '系统过载',
        subtitle: '高级肌肥大追踪器',
        systemStress: '系统压力',
        addExercise: '添加练习',
        addToWorkout: '加入训练',
        currentSession: '当前会话',
        noExercises: '尚未添加练习。',
        howItWorks: '如何运作',
        howItWorksText: '选择一个练习并将其添加到您的会话中。人体图将可视化每个肌肉群的累积压力。绿色表示刺激，黄色表示疲劳，红色表示过度训练风险。',
        muscleActivation: '肌肉激活',
        front: '正面',
        back: '背面',
        low: '低',
        med: '中',
        high: '高',
        exercise: '练习',
        sets: '组数',
        reps: '次数',
        suggestions: '建议',
        bestExercisesFor: '最佳练习',
        noExercisesFound: '未找到针对该肌肉群的练习。',

        // Exercise Names (ZH)
        exercise_bench_press: '卧推',
        exercise_squat: '深蹲',
        exercise_deadlift: '硬拉',
        exercise_pull_up: '引体向上',
        exercise_overhead_press: '过头推举',
        exercise_barbell_row: '杠铃划船',
        exercise_dumbbell_curl: '哑铃弯举',
        exercise_tricep_extension: '三头肌伸展',
        exercise_leg_curl: '腿弯举',
        exercise_leg_extension: '腿屈伸',
        exercise_crunch: '卷腹',
        exercise_side_plank: '侧平板支撑',

        // Instructions (ZH)
        instruction_bench_press: '躺在长凳上，将杠铃下放到胸部，然后推起。',
        instruction_squat: '双脚与肩同宽，下蹲至大腿平行，站起。',
        instruction_deadlift: '保持背部挺直，从地面提起杠铃，站直。',
        instruction_pull_up: '悬挂在横杆上，将下巴拉过横杆，放下。',
        instruction_overhead_press: '从肩部将杠铃推举至头顶锁定。',
        instruction_barbell_row: '俯身，将杠铃拉至下胸部，缓慢放下。',
        instruction_dumbbell_curl: '将哑铃弯举至肩部，控制下放。',
        instruction_tricep_extension: '手臂过头伸展或下压以隔离三头肌。',
        instruction_leg_curl: '双腿对抗阻力弯曲以针对腘绳肌。',
        instruction_leg_extension: '双腿对抗阻力伸展以针对股四头肌。',
        instruction_crunch: '仰卧，上半身向膝盖卷曲。',
        instruction_side_plank: '用一只前臂和脚侧支撑身体，保持。',
    },
    es: {
        appTitle: 'Smart Split',
        subtitle: 'Rastreador Avanzado de Hipertrofia',
        systemStress: 'Estrés del Sistema',
        addExercise: 'Añadir Ejercicio',
        addToWorkout: 'Agregar al Entrenamiento',
        currentSession: 'Sesión Actual',
        noExercises: 'No hay ejercicios añadidos.',
        howItWorks: 'Cómo funciona',
        howItWorksText: 'Selecciona un ejercicio y añádelo a tu sesión. El mapa corporal visualizará el estrés acumulado en cada grupo muscular. Verde indica estímulo, Amarillo indica fatiga, Rojo indica riesgo de sobreentrenamiento.',
        muscleActivation: 'Activación Muscular',
        front: 'Frente',
        back: 'Espalda',
        low: 'Bajo',
        med: 'Medio',
        high: 'Alto',
        exercise: 'Ejercicio',
        sets: 'Series',
        reps: 'Reps',
        suggestions: 'Sugerencias',
        bestExercisesFor: 'Mejores ejercicios para',
        noExercisesFound: 'No se encontraron ejercicios específicos.',

        // Exercise Names (ES)
        exercise_bench_press: 'Press de Banca',
        exercise_squat: 'Sentadilla',
        exercise_deadlift: 'Peso Muerto',
        exercise_pull_up: 'Dominada',
        exercise_overhead_press: 'Press Militar',
        exercise_barbell_row: 'Remo con Barra',
        exercise_dumbbell_curl: 'Curl de Bíceps',
        exercise_tricep_extension: 'Extensión de Tríceps',
        exercise_leg_curl: 'Curl de Pierna',
        exercise_leg_extension: 'Extensión de Pierna',
        exercise_crunch: 'Abdominales',
        exercise_side_plank: 'Plancha Lateral',

        // Instructions (ES)
        instruction_bench_press: 'Acuéstate en el banco, baja la barra al pecho, empuja hacia arriba.',
        instruction_squat: 'Pies al ancho de hombros, baja caderas hasta paralelo, levántate.',
        instruction_deadlift: 'Levanta barra del suelo con espalda recta, ponte erguido.',
        instruction_pull_up: 'Cuélgate, sube barbilla sobre la barra, baja controlado.',
        instruction_overhead_press: 'Empuja barra desde hombros hasta estirar brazos arriba.',
        instruction_barbell_row: 'Inclinado, jala barra hacia pecho bajo, baja lento.',
        instruction_dumbbell_curl: 'Flexiona mancuerna hacia hombro, baja con control.',
        instruction_tricep_extension: 'Extiende brazo sobre cabeza para aislar tríceps.',
        instruction_leg_curl: 'Flexiona piernas contra resistencia para isquiotibiales.',
        instruction_leg_extension: 'Extiende piernas contra resistencia para cuádriceps.',
        instruction_crunch: 'Acuéstate, flexiona torso hacia rodillas.',
        instruction_side_plank: 'Apoya cuerpo en antebrazo y borde del pie, mantén.',
    },
    hi: {
        appTitle: 'Smart Split',
        subtitle: 'उन्नत हाइपरट्रॉफी ट्रैकर',
        systemStress: 'सिस्टम तनाव',
        addExercise: 'व्यायाम जोड़ें',
        addToWorkout: 'वर्कआउट में जोड़ें',
        currentSession: 'वर्तमान सत्र',
        noExercises: 'अभी तक कोई व्यायाम नहीं जोड़ा गया।',
        howItWorks: 'यह कैसे काम करता है',
        howItWorksText: 'एक व्यायाम चुनें और उसे अपने सत्र में जोड़ें। बॉडी मैप प्रत्येक मांसपेशी समूह पर संचित तनाव की कल्पना करेगा। हरा उत्तेजना को इंगित करता है, पीला थकान को, लाल ओवरट्रेनिंग जोखिम को।',
        muscleActivation: 'मांसपेशी सक्रियण',
        front: 'सामने',
        back: 'पीछे',
        low: 'कम',
        med: 'मध्यम',
        high: 'उच्च',
        exercise: 'व्यायाम',
        sets: 'सेट्स',
        reps: 'रेप्स',
        suggestions: 'सुझाव',
        bestExercisesFor: 'के लिए सर्वश्रेष्ठ व्यायाम',
        noExercisesFound: 'कोई व्यायाम नहीं मिला।',
    },
    // Minimal placeholders for others to save context window space, focusing on logic
    fr: { appTitle: 'Smart Split', subtitle: 'Suivi d\'Hypertrophie', systemStress: 'Stress Système', addExercise: 'Ajouter', addToWorkout: 'Ajouter', currentSession: 'Session', noExercises: 'Aucun exercice', howItWorks: 'Comment ça marche', howItWorksText: 'Visualisez le stress musculaire.', muscleActivation: 'Activation', front: 'Avant', back: 'Arrière', low: 'Bas', med: 'Moy', high: 'Haute', exercise: 'Examen', sets: 'Séries', reps: 'Reps' },
    ar: { appTitle: 'Smart Split', subtitle: 'متتبع التضخم المتقدم', systemStress: 'إجهاد النظام', addExercise: 'إضافة تمرين', addToWorkout: 'إضافة للتمرين', currentSession: 'الجلسة الحالية', noExercises: 'لا تمارين', howItWorks: 'كيف يعمل', howItWorksText: 'تصور الإجهاد العضلي.', muscleActivation: 'تنشيط العضلات', front: 'أمام', back: 'خلف', low: 'منخفض', med: 'متوسط', high: 'عالي', exercise: 'تمرين', sets: 'مجموعات', reps: 'تكرار' },
    bn: { appTitle: 'Smart Split', subtitle: 'Advanced Hypertrophy Tracker', systemStress: 'System Stress', addExercise: 'Add Exercise', addToWorkout: 'Add', currentSession: 'Session', noExercises: 'No exercises', howItWorks: 'Algorithm', howItWorksText: 'Stress visualization.', muscleActivation: 'Activation', front: 'Front', back: 'Back', low: 'Low', med: 'Med', high: 'High', exercise: 'Exercise', sets: 'Sets', reps: 'Reps' },
    ru: { appTitle: 'Smart Split', subtitle: 'Трекер Гипертрофии', systemStress: 'Стресс Системы', addExercise: 'Добавить', addToWorkout: 'Добавить', currentSession: 'Сессия', noExercises: 'Нет упражнений', howItWorks: 'Как это работает', howItWorksText: 'Визуализация стресса.', muscleActivation: 'Активация', front: 'Перед', back: 'Спина', low: 'Низ', med: 'Сред', high: 'Выс', exercise: 'Упражнение', sets: 'Подходы', reps: 'Повторы' },
    pt: { appTitle: 'Smart Split', subtitle: 'Rastreador de Hipertrofia', systemStress: 'Estresse do Sistema', addExercise: 'Adicionar', addToWorkout: 'Adicionar', currentSession: 'Sessão', noExercises: 'Sem exercícios', howItWorks: 'Como funciona', howItWorksText: 'Visualize o estresse muscular.', muscleActivation: 'Ativação', front: 'Frente', back: 'Costas', low: 'Baixo', med: 'Méd', high: 'Alto', exercise: 'Exercício', sets: 'Séries', reps: 'Reps' },
    id: { appTitle: 'Smart Split', subtitle: 'Pelacak Hipertrofi', systemStress: 'Stres Sistem', addExercise: 'Tambah', addToWorkout: 'Tambah', currentSession: 'Sesi', noExercises: 'Tidak ada latihan', howItWorks: 'Cara kerja', howItWorksText: 'Visualisasi stres otot.', muscleActivation: 'Aktivasi', front: 'Depan', back: 'Belakang', low: 'Rendah', med: 'Sedang', high: 'Tinggi', exercise: 'Latihan', sets: 'Set', reps: 'Reps' },
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language: 'en',
    setLanguage: (lang) => set({ language: lang }),
    t: (key) => {
        const lang = get().language;
        // Fallback to English if key missing
        // @ts-expect-error Keys are not perfectly strictly typed across all languages validation
        return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
    }
}));
