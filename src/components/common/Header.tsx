import { cx } from '@/utils/cx'
import { Sun, Moon01, UserCircle } from '@untitledui/icons'
import { ComponentType } from 'react'
import { Button } from '@/components/base/button/button'
import { useTheme } from '@/providers/theme-provider'

type HeaderProps = {
  primaryText?: string
  secondaryText?: string
  className?: string
  icon?: ComponentType<{
    className?: string
    strokeWidth?: number
  }>
  onClick?: () => void
}

export default function Header({
  icon: Icon,
  className,
  primaryText,
  secondaryText,
  onClick,
}: HeaderProps) {
  const { theme, setTheme } = useTheme()
  function themeSwitch() {
    if (theme == 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <header className={cx('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <Button onClick={onClick} color="link-color">
          {Icon ? (
            <Icon className="size-8" strokeWidth={1.5} />
          ) : (
            <UserCircle className="size-8" strokeWidth={1.5} />
          )}
        </Button>
        <div className="flex flex-col">
          {primaryText && <div>{primaryText}</div>}
          {secondaryText && <div>{secondaryText}</div>}
        </div>
      </div>
      <Button color="link-color" onClick={themeSwitch}>
        {theme == 'dark' ? <Sun /> : <Moon01 />}
      </Button>
    </header>
  )
}
