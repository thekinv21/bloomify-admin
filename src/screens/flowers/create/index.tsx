import { CrudEnum } from '@/types/custom.enum'

import { FlowerForm } from '../form/FlowerForm'

export default function CreateFlowerPage() {
	return <FlowerForm type={CrudEnum.CREATE} />
}
