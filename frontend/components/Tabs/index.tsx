import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export interface Tabs {
  tabsLabel: string[];
  tabsContent: ReactNode[];
}
export const Tabs = (props: Tabs): JSX.Element => {
  const [ currentTab, setTab ] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fromUrl = Number(router.query.panel) - 1;
    if (router.query.panel && fromUrl !== currentTab) {
      setTab(fromUrl)
    }
  }, [router, currentTab]);


  const jumpToTab = (index: number) => () => {
    router.query.panel = index.toString();
    setTab(index);
  }

  return (
    <>
      <div className="flex -mb-1">
        {
          props.tabsLabel.map((label: string, key: number) => (
            <TabHeader key={key} onClick={jumpToTab(key)} isActive={currentTab === key}>{label}</TabHeader>
          ))
        }
      </div>
      <div className="p-2 card z-10 flex-wrap flex">
        {
          !props.tabsContent[currentTab]
            ? null
            : props.tabsContent[currentTab]
        }
      </div>
    </>
  )
}

interface TabHeaderProps {
  onClick: () => void;
  children: ReactNode;
  isActive: boolean;
}
const TabHeader = (props: TabHeaderProps) => (
  <div
    onClick={props.onClick}
    className={`card p-2 cursor-pointer rounded ${getClsTabActive(props.isActive)}`}
  >
    { props.children }
  </div>
)

const getClsTabActive = (isActive: boolean) => (
  !isActive ? 'border-inset rounded-b-none border-b-solid border-b-white mb-2px' : 'border-b-transparent'
)
