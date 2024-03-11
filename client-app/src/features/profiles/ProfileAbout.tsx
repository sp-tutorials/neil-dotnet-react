import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Profile } from '../../app/models/profile';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';

interface Props {
    profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
    const { profileStore: { isCurrentUser, updateProfile, loading } } = useStore();
    const [editAboutMode, setEditAboutMode] = useState(false);

    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
    })

    function handleFormSubmit(values: { displayName: string, bio: string | undefined }) {
        updateProfile(values).then(() => setEditAboutMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile.displayName}`} />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={editAboutMode ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setEditAboutMode(!editAboutMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {
                        editAboutMode ? (
                            <Formik
                                validationSchema={validationSchema}
                                enableReinitialize
                                initialValues={{ displayName: profile.displayName, bio: profile.bio }}
                                onSubmit={values => handleFormSubmit(values)}
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className='ui form' onSubmit={handleSubmit}>
                                        <MyTextInput name='displayName' placeholder='Display Name' />
                                        <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                                        <Button
                                            disabled={isSubmitting || !dirty || !isValid}
                                            loading={isSubmitting || loading} floated='right'
                                            positive type='submit' content='Update profile'
                                        />
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <p style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</p>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})