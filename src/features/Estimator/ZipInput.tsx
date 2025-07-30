import type { ZipInputProps } from '../../type/types'

export default function ZipInput({ zip, onChange }: ZipInputProps) {
  return (
    <label>
      Zip Code:
      <input
        type="text"
        value={zip}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ZIP"
        maxLength={5}
        pattern="\d{5}"
      />
    </label>
  )
}
