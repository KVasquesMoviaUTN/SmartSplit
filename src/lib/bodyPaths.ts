import { MuscleGroup } from "./muscleMapping";

export interface BodyPath {
    id: string; // unique identifier for the path element
    muscle: MuscleGroup | 'Head' | 'Neck' | 'Knees'; // Head/Neck are cosmetic
    d: string; // SVG path data
}

// Simplified Geometric Body Map (200x400 ViewBox)
// A stylized, futuristic "Cyber-Human" wireframe aesthetic.

export const FRONT_PATHS: BodyPath[] = [
    // Head & Neck
    { id: 'head', muscle: 'Head', d: 'M85,30 C85,10 115,10 115,30 C115,48 85,48 85,30 Z' },
    { id: 'neck', muscle: 'Neck', d: 'M90,45 Q100,60 110,45 L110,55 Q100,65 90,55 Z' },

    // Torso (Traps, Pecs, Abs, Obliques)
    { id: 'traps_l', muscle: 'Traps', d: 'M90,55 L70,60 Q80,75 92,65 Z' },
    { id: 'traps_r', muscle: 'Traps', d: 'M110,55 L130,60 Q120,75 108,65 Z' },

    { id: 'pecs_l', muscle: 'Pecs', d: 'M92,65 Q70,70 55,68 L62,95 Q80,105 100,95 Z' },
    { id: 'pecs_r', muscle: 'Pecs', d: 'M108,65 Q130,70 145,68 L138,95 Q120,105 100,95 Z' },

    // Arms (Shoulders split)
    { id: 'side_delts_l', muscle: 'SideDelts', d: 'M55,68 Q35,75 35,90 L40,95 Q50,85 55,68 Z' }, // Outer cap
    { id: 'front_delts_l', muscle: 'FrontDelts', d: 'M55,68 L40,95 Q45,100 55,85 Z' }, // Inner front

    { id: 'side_delts_r', muscle: 'SideDelts', d: 'M145,68 Q165,75 165,90 L160,95 Q150,85 145,68 Z' },
    { id: 'front_delts_r', muscle: 'FrontDelts', d: 'M145,68 L160,95 Q155,100 145,85 Z' },

    { id: 'abs', muscle: 'Abs', d: 'M75,100 Q100,105 125,100 L120,135 Q100,145 80,135 Z' },
    { id: 'obliques_l', muscle: 'Obliques', d: 'M75,100 L55,95 Q58,120 70,135 L80,135 Z' },
    { id: 'obliques_r', muscle: 'Obliques', d: 'M125,100 L145,95 Q142,120 130,135 L120,135 Z' },

    // Arms (Biceps, Forearms)
    { id: 'biceps_l', muscle: 'Biceps', d: 'M55,85 Q45,110 50,125 L60,125 Q65,110 55,85 Z' }, // Moved Biceps slightly in
    { id: 'biceps_r', muscle: 'Biceps', d: 'M145,85 Q155,110 150,125 L140,125 Q135,110 145,85 Z' },
    { id: 'forearms_l', muscle: 'Forearms', d: 'M50,125 L40,155 Q50,165 60,155 L58,130 Z' },
    { id: 'forearms_r', muscle: 'Forearms', d: 'M150,125 L160,155 Q150,165 140,155 L142,130 Z' },

    // Legs (Quads, Calves)
    { id: 'quads_l', muscle: 'Quads', d: 'M62,140 Q55,170 65,200 L95,205 Q98,170 100,140 Z' },
    { id: 'quads_r', muscle: 'Quads', d: 'M138,140 Q145,170 135,200 L105,205 Q102,170 100,140 Z' },

    { id: 'knees_l', muscle: 'Knees', d: 'M65,200 L95,205 L92,225 Q80,230 68,225 Z' },
    { id: 'knees_r', muscle: 'Knees', d: 'M135,200 L105,205 L108,225 Q120,230 132,225 Z' },

    { id: 'calves_l', muscle: 'Calves', d: 'M68,225 Q60,250 70,270 L90,280 L92,225 Z' },
    { id: 'calves_r', muscle: 'Calves', d: 'M132,225 Q140,250 130,270 L110,280 L108,225 Z' },
];

export const BACK_PATHS: BodyPath[] = [
    // Head & Neck
    { id: 'head_b', muscle: 'Head', d: 'M85,30 C85,10 115,10 115,30 C115,48 85,48 85,30 Z' },
    { id: 'neck_b', muscle: 'Neck', d: 'M90,45 Q100,55 110,45 L110,55 Q100,65 90,55 Z' },

    // Upper Back
    { id: 'traps_b_l', muscle: 'Traps', d: 'M90,55 L70,60 Q80,75 92,90 L100,55 Z' },
    { id: 'traps_b_r', muscle: 'Traps', d: 'M110,55 L130,60 Q120,75 108,90 L100,55 Z' },

    { id: 'lats_l', muscle: 'Lats', d: 'M70,60 L55,90 Q65,110 92,130 L92,90 Z' },
    { id: 'lats_r', muscle: 'Lats', d: 'M130,60 L145,90 Q135,110 108,130 L108,90 Z' },

    { id: 'side_delts_b_l', muscle: 'SideDelts', d: 'M55,68 Q35,75 35,90 L45,95 L55,85 L55,68 Z' },
    { id: 'rear_delts_l', muscle: 'RearDelts', d: 'M55,68 L55,85 L45,95 Q45,100 55,85 Z' }, // Small rear sliver

    { id: 'side_delts_b_r', muscle: 'SideDelts', d: 'M145,68 Q165,75 165,90 L155,95 L145,85 L145,68 Z' },
    { id: 'rear_delts_r', muscle: 'RearDelts', d: 'M145,68 L145,85 L155,95 Q155,100 145,85 Z' },

    { id: 'triceps_l', muscle: 'Triceps', d: 'M45,95 L35,125 L55,125 L55,95 Z' },
    { id: 'triceps_r', muscle: 'Triceps', d: 'M155,95 L165,125 L145,125 L145,95 Z' },
    { id: 'forearms_b_l', muscle: 'Forearms', d: 'M35,125 L25,160 L45,160 L50,130 Z' },
    { id: 'forearms_b_r', muscle: 'Forearms', d: 'M165,125 L175,160 L155,160 L150,130 Z' },

    // Lower Back & Glutes
    { id: 'lower_back', muscle: 'LowerBack', d: 'M92,130 L108,130 L105,150 L95,150 Z' },
    { id: 'glutes_l', muscle: 'Glutes', d: 'M95,150 L60,150 Q60,180 65,190 L98,190 Z' },
    { id: 'glutes_r', muscle: 'Glutes', d: 'M105,150 L140,150 Q140,180 135,190 L102,190 Z' },

    // Legs Back
    { id: 'hamstrings_l', muscle: 'Hamstrings', d: 'M65,190 Q58,210 68,230 L95,230 L98,190 Z' },
    { id: 'hamstrings_r', muscle: 'Hamstrings', d: 'M135,190 Q142,210 132,230 L105,230 L102,190 Z' },

    { id: 'calves_b_l', muscle: 'Calves', d: 'M68,230 L95,230 L90,280 L70,270 Z' },
    { id: 'calves_b_r', muscle: 'Calves', d: 'M132,230 L105,230 L110,280 L130,270 Z' },
];
