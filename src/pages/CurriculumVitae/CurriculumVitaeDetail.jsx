import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Progress,
    Row,
    Col
} from "reactstrap";
import { List } from 'semantic-ui-react'
import { Menu, Modal } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import CurriculumVitaeService from '../../services/curriculumVitaeService';
import CandidateEducationService from '../../services/candidateEducationService'
import DegreeService from '../../services/degreeService'
import { toast } from 'react-toastify';
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput';
import HrmsSelect from '../../utilities/customFormControls/HrmsSelect';

function exampleReducer2(state, action) {
    switch (action.type) {
        case 'close':
            return { open: false }
        case 'open':
            return { open: true, size: action.size }
        default:
            throw new Error('Unsupported action...')
    }
}

const refreshPage = ()=>{
    window.location.reload();
}

export default function CurriculumVitaeDetail() {
    let { curriculumVitaeId } = useParams();

    const [curriculumVitae, setCurriculumVitae] = useState({})
    const [degrees, setDegrees] = useState([])

    useEffect(() => {
        let curriculumVitaeService = new CurriculumVitaeService()
        curriculumVitaeService.getCurriculumVitaesById(curriculumVitaeId).then((result) => setCurriculumVitae(result.data.data))

        let degreeService = new DegreeService()
        degreeService.getDegrees().then((result) => setDegrees(result.data.data))
    }, [])


    const [state, dispatch] = React.useReducer(exampleReducer2, {
        open: false,
        size: undefined,
    })
    const { open, size } = state

    const initialValuesEducation = {
        universityName: "",
        departmentName: "",
        degreeId: "",
        startedDate: "",
        graduatedDate: "",
        curriculumVitaeId: ""
    }
    const schemaEducation = Yup.object({
        universityName: Yup.string().required("Üniversite adı eklenmelidir"),
        departmentName: Yup.string().required("Bölüm adı yazılmalıdır"),
        degreeId: Yup.string().required("Eğitim derecesi seçilmelidir"),
        startedDate: Yup.string().required(),
        graduatedDate: Yup.string(),
        curriculumVitaeId: Yup.number()
    })
    return (
        <div>
            <Row className="mt-5">
                <Col md="3">
                    <Menu vertical>
                        <Menu.Item className="text-left" as='a'>Eğitim Bilgisi</Menu.Item>
                        <Menu.Item className="text-left" as='a'>İş Deneyimi</Menu.Item>
                        <Menu.Item className="text-left" as='a'>Dil</Menu.Item>
                        <Menu.Item className="text-left" as='a'>Yetenekler</Menu.Item>
                    </Menu>
                </Col>
                <Col md="9">
                    <Card className="card-stats mb-4 mb-lg-0">
                        <CardBody>
                            <Row style={{ marginBottom: "3em" }}>
                                <div className="col-md-2">
                                    <CardImg
                                        alt="..."
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/%C3%96rnek.jpg"
                                        top
                                    />
                                </div>
                                <div className="col-md-10">
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>İletişim Bilgileri</CardTitle>
                                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                                    <List divided relaxed>
                                        <List.Item>
                                            <List.Icon name='github' size='large' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as='a'>{curriculumVitae.githubLink}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='linkedin' size='large' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as='a'>{curriculumVitae.linkedinLink}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </div>
                            </Row>
                            <Row style={{ marginBottom: "3em" }}>
                                <div className="col-md-6">
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>
                                        Eğitim Bilgileri
                                        <Button onClick={() => dispatch({ type: 'open', size: 'tiny' })}>+</Button>
                                    </CardTitle>
                                    <Formik initialValues={initialValuesEducation} validationSchema={schemaEducation}
                                        onSubmit={(values) => {
                                            let candidateEducationModel = {
                                                universityName: values.universityName,
                                                departmentName: values.departmentName,
                                                degree:{
                                                    id: values.degreeId
                                                }, 
                                                startedDate: values.startedDate,
                                                graduatedDate: values.graduatedDate,
                                                curriculumVitaeId: curriculumVitaeId
                                            }

                                            let candidateEducationService = new CandidateEducationService();
                                            candidateEducationService.add(candidateEducationModel).then((result) => {
                                                toast.success("Eğitim bilgisi eklendi.")
                                                setTimeout(() => {
                                                    refreshPage()
                                                }, 2000);
                                            })
                                        }}
                                        handleChange={(change) => console.log(change)}
                                    >

                                        
                                            <Modal
                                                size={size}
                                                open={open}
                                                onClose={() => dispatch({ type: 'close' })}
                                            >
                                                <Modal.Header>Eğitim Bilgisi Ekle</Modal.Header>
                                                <Form className="ui form">
                                                <Modal.Content>

                                                    <HrmsTextInput className="form-control" name="universityName" placeholder="Üniversite" />
                                                    <HrmsTextInput className="form-control" name="departmentName" placeholder="Bölüm" />
                                                    <HrmsSelect as="select" name="degreeId">
                                                        <option value="" disabled>Derece</option>
                                                        {degrees.map((degree) => (
                                                            <option key={degree.id} value={degree.id}>
                                                                {degree.degreeName}
                                                            </option>
                                                        ))}
                                                    </HrmsSelect>
                                                    <HrmsTextInput className="form-control" name="startedDate" placeholder="Başlangıç tarihi" />
                                                    <HrmsTextInput className="form-control" name="graduatedDate" placeholder="Mezuniyet Tarihi" />

                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button onClick={() => dispatch({ type: 'close' })}>
                                                        İptal
                                                    </Button>
                                                    <Button type="submit">
                                                        Ekle
                                                    </Button>
                                                </Modal.Actions>
                                                </Form>
                                            </Modal>
                                        
                                    </Formik>
                                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                                    {
                                        curriculumVitae.candidateEducations?.map((candidateEducation) => (
                                            <List className="text-left" key={candidateEducation.id}>
                                                <List.Item>{candidateEducation.universityName}</List.Item>
                                                <List.Item>{candidateEducation.departmentName}, {candidateEducation.degree.degreeName}</List.Item>
                                                <List.Item>{candidateEducation.startedDate} - {candidateEducation.graduatedDate}</List.Item>
                                            </List>
                                        ))
                                    }
                                </div>
                                <div className="col-md-6">
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>İş Deneyimi</CardTitle>
                                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                                    {
                                        curriculumVitae.candidateExperiences?.map((candidateExperience) => (
                                            <List className="text-left" key={candidateExperience.id}>
                                                <List.Item>{candidateExperience.companyName}</List.Item>
                                                <List.Item>{candidateExperience.positionName}</List.Item>
                                                <List.Item>{candidateExperience.startedDate} - {candidateExperience.quitDate}</List.Item>
                                            </List>
                                        ))
                                    }
                                </div>
                            </Row>
                            <Row>
                                <div className="col-md-6">
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>Diller</CardTitle>
                                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                                    {
                                        curriculumVitae.candidateLanguages?.map((candidateLanguage) => (
                                            <List className="text-left" key={candidateLanguage.id}>
                                                <Row>
                                                    <div className="col-md-3">
                                                        <List.Item>{candidateLanguage.languageName}</List.Item>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <Progress style={{ margin: "0.6em 0", width: "40%" }} max="100" value={candidateLanguage.languageLevel * 20} color="success" />
                                                    </div>
                                                </Row>
                                            </List>
                                        ))
                                    }
                                </div>
                                <div className="col-md-6">
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>Yetenekler</CardTitle>
                                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                                    {
                                        curriculumVitae.candidateSkills?.map((candidateSkill) => (
                                            <List className="text-left" key={candidateSkill.id}>
                                                <List.Item>{candidateSkill.skill.skillName}</List.Item>
                                            </List>
                                        ))
                                    }
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>









        </div>
    )
}
