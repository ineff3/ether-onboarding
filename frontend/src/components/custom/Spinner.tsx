interface Props {
  size?: number
}

export const Spinner = ({ size = 16 }: Props) => {
  return (
    <div
      className="border-2 border-gray-300 border-t-primary rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  )
}
