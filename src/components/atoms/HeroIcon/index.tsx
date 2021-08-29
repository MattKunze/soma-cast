import * as OutlineIcons from "@heroicons/react/outline"
import * as SolidIcons from "@heroicons/react/solid"

export const IconNames = Object.keys(OutlineIcons)

export type IconName = keyof typeof OutlineIcons
interface IconProps {
  icon: IconName
  type?: "outline" | "solid"
}

export default function HeroIcon({ icon, type = "outline" }: IconProps) {
  const IconComponent =
    type === "outline" ? OutlineIcons[icon] : SolidIcons[icon]
  return <IconComponent className="flex-shrink-0 w-5 h-5" />
}
