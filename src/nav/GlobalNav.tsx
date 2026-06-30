import { useLocation, useNavigate } from 'react-router-dom'
import { navModules } from './navConfig'
import ModuleBar from './ModuleBar'
import SubtabBar from './SubtabBar'
import ContextBar from './ContextBar'
import styles from './GlobalNav.module.css'

/** Parses pathname into moduleId and subtabId.
 *  Expects: /{moduleId}/{subtabId}[/listing/{id}]
 */
function parsePath(pathname: string) {
  const [, moduleId = '', subtabId = ''] = pathname.split('/')
  const isListingView = pathname.includes('/listing/')
  return { moduleId, subtabId, isListingView }
}

export default function GlobalNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const { moduleId, subtabId, isListingView } = parsePath(location.pathname)

  const activeModule = navModules.find(m => m.id === moduleId) ?? navModules[0]
  const activeSubtab =
    activeModule.subtabs.find(s => s.id === subtabId) ?? activeModule.subtabs[0]

  const handleModuleClick = (id: string) => {
    const mod = navModules.find(m => m.id === id)!
    const first = mod.subtabs[0]
    navigate(`/${id}${first ? `/${first.id}` : ''}`)
  }

  const handleSubtabClick = (id: string) => {
    navigate(`/${activeModule.id}/${id}`)
  }

  const showContextBar = isListingView && !!activeSubtab?.contextBar

  return (
    <header className={styles.header} role="banner">
      <ModuleBar
        modules={navModules}
        activeModuleId={activeModule.id}
        onModuleClick={handleModuleClick}
      />
      {activeModule.subtabs.length > 0 && (
        <SubtabBar
          subtabs={activeModule.subtabs}
          activeSubtabId={activeSubtab?.id}
          onSubtabClick={handleSubtabClick}
        />
      )}
      {showContextBar && <ContextBar />}
    </header>
  )
}
