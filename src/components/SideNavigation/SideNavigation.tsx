import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Button,
  Typography,
} from '@material-tailwind/react'
import {
  VscSettingsGear,
  VscJson,
  VscSymbolNumeric,
  VscCaseSensitive,
  VscLock,
  VscShield,
} from 'react-icons/vsc'

const sections = [
  {
    name: 'Text Processing',
    icon: <VscCaseSensitive />, // generic icon
    items: [
      { name: 'JSON Formatter', icon: <VscJson />, path: '/tools/json-formatter' },
      { name: 'JSON → YAML', icon: <VscJson />, path: '/tools/json-to-yaml' },
    ],
  },
  {
    name: 'Generators',
    icon: <VscSettingsGear />,
    items: [{ name: 'UUID Generator', icon: <VscSymbolNumeric />, path: '/tools/uuid' }],
  },
  {
    name: 'Security',
    icon: <VscLock />,
    items: [{ name: 'JWT Decoder', icon: <VscShield />, path: '/tools/jwt-decoder' }],
  },
]

type SectionName = (typeof sections)[number]['name']

export default function SideNavigation() {
  const [collapsed, setCollapsed] = useState(false)
  // track open/closed for each section
  const [openSections, setOpenSections] = useState<Record<SectionName, boolean>>(() => {
    const initial: Record<SectionName, boolean> = {} as any
    sections.forEach((s) => (initial[s.name] = true))
    return initial
  })

  return (
    <aside
      className={`flex-shrink-0 bg-[#18181b] dark:bg-gray-800 border-r border-[#dededf] dark:border-[#dededf] transition-all duration-200 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* header/logo */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-[#dededf] dark:border-[#dededf]">
        <Typography variant="h6" className="whitespace-nowrap text-[#dededf]">
          {collapsed ? 'DT' : 'DevTools'}
        </Typography>
        <div className="flex items-center space-x-1">
          <IconButton
            size="sm"
            variant="text"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )}
          </IconButton>
        </div>
      </div>

      {/* main navigation tabs */}
      <nav className="flex-1 overflow-y-auto px-3">
        <List className="">
          {sections.map((sec) => (
            <div key={sec.name} className="border-b border-[#dededf] dark:border-[#dededf]">
              <ListItem
                className="p-0"
                onClick={() =>
                  setOpenSections((prev) => ({
                    ...prev,
                    [sec.name]: !prev[sec.name],
                  }))
                }
              >
                <button
                  className="w-full flex items-center space-x-3 px-3 py-2 pt-5 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
                >
                  <ListItemPrefix>
                    <span className="text-lg text-[#dededf]">{sec.icon}</span>
                  </ListItemPrefix>
                  {!collapsed && (
                    <span className="text-sm font-medium text-[#dededf]">
                      {sec.name}
                    </span>
                  )}
                </button>
              </ListItem>
              {openSections[sec.name] && !collapsed && (
                <List className="ml-6 space-y-1">
                  {sec.items.map((item) => (
                    <ListItem key={item.name} className="p-0">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 w-full text-sm text-[#dededf] ${
                            isActive ? 'font-semibold' : ''
                          }`
                        }
                      >
                        <ListItemPrefix>
                          <span className="text-lg text-[#dededf]">{item.icon}</span>
                        </ListItemPrefix>
                        <span>{item.name}</span>
                      </NavLink>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
        </List>
      </nav>

      {/* footer / doc button */}
      <div className="p-3 border-t border-[#dededf] dark:border-[#dededf]">
        <Button size="sm" fullWidth>
          Documentation
        </Button>
      </div>

    </aside>
  )
}

function ChevronLeft() {
  return (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M12.293 16.293a1 1 0 010 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L10.414 11l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.707 3.707a1 1 0 00-1.414 1.414L9.586 9 6.293 12.293a1 1 0 001.414 1.414l4-4a1 1 0 000-1.414l-4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}