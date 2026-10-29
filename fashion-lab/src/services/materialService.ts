/**
 * 수업자료 데이터를 가져오는 함수들입니다.
 * 🔌 나중에 Firestore로 바꿀 때: 함수 안쪽만 고치면 됩니다. (researchService.ts 설명 참고)
 */
import { materialList } from '../data/materials';
import type { Material } from '../types';
import { sortByDateDesc } from './utils';

export async function getAllMaterials(): Promise<Material[]> {
  return sortByDateDesc(materialList);
}

export async function getRecentMaterials(count = 3): Promise<Material[]> {
  return (await getAllMaterials()).slice(0, count);
}
