import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/assignments/assignments-list',
    label: 'Assignments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ASSIGNMENTS'
  },
  {
    href: '/courses/courses-list',
    label: 'Courses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBookOpenPageVariant' in icon ? icon['mdiBookOpenPageVariant' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COURSES'
  },
  {
    href: '/notifications/notifications-list',
    label: 'Notifications',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBell' in icon ? icon['mdiBell' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_NOTIFICATIONS'
  },
  {
    href: '/submissions/submissions-list',
    label: 'Submissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileUpload' in icon ? icon['mdiFileUpload' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SUBMISSIONS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
