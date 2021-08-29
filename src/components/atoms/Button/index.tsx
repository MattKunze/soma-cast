import { ColorIntensity, PaletteColor } from "../../../types/tailwind"

export interface ButtonProps {
  text: string
  color?: PaletteColor
  icon?: React.ReactNode
  rightIcon?: boolean
  intensity?: ColorIntensity
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

export default function Button({
  text,
  icon,
  rightIcon,
  color = PaletteColor.Green,
  intensity = 500,
  active,
  disabled,
  onClick,
}: ButtonProps) {
  const content = icon ? (
    <div className="flex flex-row gap-2 items-center">
      {rightIcon ? (
        <>
          {text}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </div>
  ) : (
    text
  )
  return (
    <button
      disabled={disabled}
      className={`
        flex flex-row
        px-5 py-2 rounded-md shadow-md
        cursor-pointer disabled:cursor-not-allowed
        ${active ? "ring" : ""}
        bg-${color}-${intensity} active:bg-${color}-${intensity + 200}
        disabled:opacity-50
        ${
          intensity <= 300 || color === PaletteColor.Transparent
            ? "text-black"
            : "text-white"
        }
        focus:outline-none
      `}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
