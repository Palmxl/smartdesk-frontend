interface Props {
  text: string
  color: string
}

const Badge = ({
  text,
  color,
}: Props) => {

  return (
    <span
      className={`
        px-2
        py-1
        rounded
        text-sm
        font-medium
        ${color}
      `}
    >
      {text}
    </span>
  )
}

export default Badge