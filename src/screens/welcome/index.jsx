import { Select } from "../../components/select"

const mockOptions = [
  {
    key: 1,
    value: 'science'
  },
  {
    key: 2,
    value: 'geo'
  }
]

export const WelcomeScreen = () => {
  return (
    <div>
      <input type="number" />
      <Select options={options} />
      <Select options={options} />
      <Select options={options} />
      <Select options={options} />
    </div>
  )
}