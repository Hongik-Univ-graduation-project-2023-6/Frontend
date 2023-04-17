import { atom } from 'recoil';
import { IDiagnosisResponse } from '@/types/api';

interface IDiagnosisResponseState {
  result: IDiagnosisResponse[];
  targetLeafImageSrc: string | null;
}

const ATOM_KEY = 'DIAGNOSIS';

export const $diagnosisResultState = atom<IDiagnosisResponseState>({
  key: ATOM_KEY,
  default: {
    result: [],
    targetLeafImageSrc: null,
  },
});
