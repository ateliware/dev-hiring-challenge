import { ReactNode } from "react"

export enum Size {
  SMALL=0,
  MEDIUM
}

export enum Position {
  STATIC=0,
  ABSOLUTE
}

export interface ContainerProps {
  children: ReactNode;
  title: string;
  size: Size;
  position: Position;
}
export const Container = (props: ContainerProps) => (
  <div className={`card container mx-auto p-1 ${getClsSize(props.size)} ${getClsPosition(props.position)}`}>
    <div className="bg-blue-900 text-white p-1 text-center mb-2">
      { props.title }
    </div>
    { props.children }
  </div>
)

const getClsSize = (size: Size): string => (
  ({
    [Size.SMALL]: 'max-w-screen-sm',
    [Size.MEDIUM]: 'max-w-screen-md',
  })[size]
)

const getClsPosition = (position: Position): string => (
  ({
    [Position.STATIC]: '',
    [Position.ABSOLUTE]: 'absolute z-50'
  })[position]
)
