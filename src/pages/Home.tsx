import { Table, ColumnType } from '../components/Table'

const columns: ColumnType[] = [
  { id: 'name', title: 'Name', dataIndex: 'name' },
  { id: 'surname', title: 'Surname', dataIndex: 'surname' }
]

function Home() {
  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={data} />
    </>
  )
}

export default Home

const data = [
  {
    id: '60c399989ad40764d39e4626',
    name: 'Head',
    surname: 'Mullins'
  },
  {
    id: '60c39998a0c97486f518c141',
    name: 'Jacobs',
    surname: 'Walters'
  },
  {
    id: '60c3999865c83594b309e982',
    name: 'Nichole',
    surname: 'Tate'
  },
  {
    id: '60c39998eb20b04712a4dcbe',
    name: 'Jimmie',
    surname: 'Kim'
  },
  {
    id: '60c399980f761108163f90a4',
    name: 'Josie',
    surname: 'Conway'
  },
  {
    id: '60c39998d7614925e0b0bca9',
    name: 'Jessica',
    surname: 'Finley'
  },
  {
    id: '60c39998f32abad7d63fbc24',
    name: 'Brown',
    surname: 'Robles'
  },
  {
    id: '60c399986baad228ac6aeda8',
    name: 'Jewell',
    surname: 'Cohen'
  },
  {
    id: '60c3999872523867e6d2f09a',
    name: 'Rosemarie',
    surname: 'Rodgers'
  },
  {
    id: '60c3999806962588f92194cf',
    name: 'Nunez',
    surname: 'Emerson'
  },
  {
    id: '60c39998b87eaa2b39602610',
    name: 'Pratt',
    surname: 'Haney'
  },
  {
    id: '60c39998a1a75f2376107a7e',
    name: 'Irene',
    surname: 'Myers'
  },
  {
    id: '60c3999828102eaf560e2455',
    name: 'Mcgee',
    surname: 'Phillips'
  },
  {
    id: '60c39998ded689fc097e0300',
    name: 'Galloway',
    surname: 'Mccoy'
  },
  {
    id: '60c3999861cdde2b62634ae8',
    name: 'Edwina',
    surname: 'Hoffman'
  },
  {
    id: '60c39998ccb5571301f7d062',
    name: 'Diana',
    surname: 'Blanchard'
  },
  {
    id: '60c3999884e37f846e0d1d92',
    name: 'Schmidt',
    surname: 'Gonzales'
  },
  {
    id: '60c39998ed973b02210f81a1',
    name: 'Pierce',
    surname: 'Ramos'
  },
  {
    id: '60c39998801278a438f46ef8',
    name: 'Lena',
    surname: 'Chavez'
  },
  {
    id: '60c39998ad0d6e9adb23fc32',
    name: 'Raymond',
    surname: 'Harding'
  },
  {
    id: '60c399984f701c25f357b7a2',
    name: 'Tami',
    surname: 'Bauer'
  },
  {
    id: '60c399984bf1fd51a065035d',
    name: 'Alyson',
    surname: 'Nguyen'
  }
]
