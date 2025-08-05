import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/courses/coursesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditCourses = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'title': '',

    description: '',

    instructor: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { courses } = useAppSelector((state) => state.courses)

  const { coursesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: coursesId }))
  }, [coursesId])

  useEffect(() => {
    if (typeof courses === 'object') {
      setInitialValues(courses)
    }
  }, [courses])

  useEffect(() => {
      if (typeof courses === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (courses)[el])

          setInitialValues(newInitialVal);
      }
  }, [courses])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: coursesId, data }))
    await router.push('/courses/courses-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit courses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit courses'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="CourseTitle"
    >
        <Field
            name="title"
            placeholder="CourseTitle"
        />
    </FormField>

    <FormField label='Description' hasTextareaHeight>
        <Field
            name='description'
            id='description'
            component={RichTextField}
        ></Field>
    </FormField>

    <FormField label='Instructor' labelFor='instructor'>
        <Field
            name='instructor'
            id='instructor'
            component={SelectField}
            options={initialValues.instructor}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/courses/courses-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditCourses.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditCourses
