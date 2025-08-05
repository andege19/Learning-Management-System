import * as icon from '@mdi/js';
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import BaseIcon from "../components/BaseIcon";

import Link from "next/link";
import { useAppSelector } from '../stores/hooks';
const Dashboard = () => {
    const iconsColor = useAppSelector((state) => state.style.iconsColor);
    const corners = useAppSelector((state) => state.style.corners);
    const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

    const loadingMessage = 'Loading...'

    const [users, setUsers] = React.useState(loadingMessage);
    const [assignments, setAssignments] = React.useState(loadingMessage);
    const [courses, setCourses] = React.useState(loadingMessage);
    const [notifications, setNotifications] = React.useState(loadingMessage);
    const [submissions, setSubmissions] = React.useState(loadingMessage);
    const [roles, setRoles] = React.useState(loadingMessage);
    const [permissions, setPermissions] = React.useState(loadingMessage);

    async function loadData() {
        const entities = ['users','assignments','courses','notifications','submissions','roles','permissions',];
        const fns = [setUsers,setAssignments,setCourses,setNotifications,setSubmissions,setRoles,setPermissions,];

        const requests = entities.map((entity, index) => {
            return axios.get(`/${entity.toLowerCase()}/count`);
        });

        Promise.allSettled(requests).then((results) => {
            results.forEach((result, i) => {
                if (result.status === 'fulfilled') {
                    fns[i](result.value.data.count);
                } else {
                    fns[i](result.reason.message);
                }
            });
        });
    }

  React.useEffect(() => {
      loadData().then();
  }, []);

  return (
    <>
      <Head>
        <title>
            {'Overview'}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
            icon={icon.mdiChartTimelineVariant}
            title={'Overview'}
            main>
          {''}
        </SectionTitleLineWithButton>

        <div id="dashboard" className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>

            <Link href={'/users/users-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Users
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {users}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiAccountGroup || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/assignments/assignments-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Assignments
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {assignments}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/courses/courses-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Courses
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {courses}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiBookOpenPageVariant' in icon ? icon['mdiBookOpenPageVariant' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/notifications/notifications-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Notifications
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {notifications}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiBell' in icon ? icon['mdiBell' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/submissions/submissions-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Submissions
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {submissions}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFileUpload' in icon ? icon['mdiFileUpload' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
