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

import { update, fetch } from '../../stores/submissions/submissionsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditSubmissions = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    assignment: null,

    student: null,

    'grade': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { submissions } = useAppSelector((state) => state.submissions)

  const { submissionsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: submissionsId }))
  }, [submissionsId])

  useEffect(() => {
    if (typeof submissions === 'object') {
      setInitialValues(submissions)
    }
  }, [submissions])

  useEffect(() => {
      if (typeof submissions === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (submissions)[el])

          setInitialValues(newInitialVal);
      }
  }, [submissions])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: submissionsId, data }))
    await router.push('/submissions/submissions-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit submissions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit submissions'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label='Assignment' labelFor='assignment'>
        <Field
            name='assignment'
            id='assignment'
            component={SelectField}
            options={initialValues.assignment}
            itemRef={'assignments'}

            showField={'title'}

        ></Field>
    </FormField>

    <FormField label='Student' labelFor='student'>
        <Field
            name='student'
            id='student'
            component={SelectField}
            options={initialValues.student}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField
        label="Grade"
    >
        <Field
            type="number"
            name="grade"
            placeholder="Grade"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/submissions/submissions-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditSubmissions.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditSubmissions
