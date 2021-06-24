import { useField, Field } from 'formik'
import React from 'react'
import { Label } from 'semantic-ui-react'

export default function HrmsSelect({...props}) {
    const[field, meta] = useField(props)
    return (
        <div>
            <Field {...field} {...props}>
                {props.children}
            </Field>
            {meta.touched && !!meta.error ? (
                <Label pointing basic color="red" content={meta.error}></Label>
            ) : null}
        </div>
    )
}
