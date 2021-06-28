import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardTitle, Progress, Row, Col } from "reactstrap";
import { List } from 'semantic-ui-react'
import { Menu, Modal } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import CurriculumVitaeService from '../../services/curriculumVitaeService';
import CandidateEducationService from '../../services/candidateEducationService'
import CandidateExperienceService from '../../services/candidateExperienceService'
import CandidateLanguageService from '../../services/candidateLanguageService'
import CandidateSkillService from '../../services/candidateSkillService';
import DegreeService from '../../services/degreeService'
import SkillService from '../../services/skillService';
import { toast } from 'react-toastify';
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput';
import HrmsSelect from '../../utilities/customFormControls/HrmsSelect';

const refreshPage = () => {
    window.location.reload();
}

export default function CurriculumVitaeDetail() {
    let { curriculumVitaeId } = useParams();

    const [curriculumVitae, setCurriculumVitae] = useState({})
    const [degrees, setDegrees] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() => {
        let curriculumVitaeService = new CurriculumVitaeService()
        curriculumVitaeService.getCurriculumVitaesById(curriculumVitaeId).then((result) => setCurriculumVitae(result.data.data))

        let degreeService = new DegreeService()
        degreeService.getDegrees().then((result) => setDegrees(result.data.data))

        let skillService = new SkillService()
        skillService.getSkills().then((result) => setSkills(result.data.data))
    }, [])



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


    const initialValuesExperience = {
        companyName: "",
        positionName: "",
        startedDate: "",
        quitDate: "",
        curriculumVitaeId: ""
    }
    const schemaExperience = Yup.object({
        companyName: Yup.string().required("Şirket adı eklenmelidir"),
        positionName: Yup.string().required("Çalışılan pozisyon adı eklenmelidir"),
        startedDate: Yup.string().required("İşe başlama zamanı eklenmelidir"),
        quitDate: Yup.string(),
        curriculumVitaeId: Yup.number()
    })

    const initialValuesLanguage = {
        languageName: "",
        languageLevel: "",
        curriculumVitaeId: ""
    }
    const schemaLanguage = Yup.object({
        languageName: Yup.string().required("Dil eklenmeli"),
        languageLevel: Yup.number().required("Dil seviyesi eklenmeli"),
        curriculumVitaeId: Yup.number()
    })

    const initialValuesSkill = {
        skillId: "",
        curriculumVitaeId: "",
    }

    const schemaSkill = Yup.object({
        skillId: Yup.string().required("Yetenek seçilmelidir"),
        curriculumVitaeId: Yup.number()
    })

    const [openEducation, setOpenEducation] = useState(false)
    const [openExperience, setOpenExperience] = useState(false)
    const [openLanguage, setOpenLanguage] = useState(false)
    const [openSkill, setOpenSkill] = useState(false)

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
                                        <Button onClick={() => setOpenEducation(true)}>+</Button>
                                    </CardTitle>
                                    <Formik initialValues={initialValuesEducation} validationSchema={schemaEducation}
                                        onSubmit={(values) => {
                                            let candidateEducationModel = {
                                                universityName: values.universityName,
                                                departmentName: values.departmentName,
                                                degree: {
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
                                            onClose={() => setOpenEducation(false)}
                                            onOpen={() => setOpenEducation(true)}
                                            open={openEducation}
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
                                                    <Button>
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
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>
                                        İş Deneyimi
                                        <Button onClick={() => setOpenExperience(true)}>+</Button>
                                    </CardTitle>
                                    <Formik initialValues={initialValuesExperience} validationSchema={schemaExperience}
                                        onSubmit={(values) => {
                                            let candidateExperienceModel = {
                                                companyName: values.companyName,
                                                positionName: values.positionName,
                                                startedDate: values.startedDate,
                                                quitDate: values.quitDate,
                                                curriculumVitaeId: curriculumVitaeId
                                            }

                                            let candidateExperienceService = new CandidateExperienceService();
                                            candidateExperienceService.add(candidateExperienceModel).then((result) => {
                                                toast.success("İş deneyimi bilgisi eklendi.")
                                                setTimeout(() => {
                                                    refreshPage()
                                                }, 2000);
                                            })
                                        }}
                                        handleChange={(change) => console.log(change)}
                                    >


                                        <Modal
                                            onClose={() => setOpenExperience(false)}
                                            onOpen={() => setOpenExperience(true)}
                                            open={openExperience}
                                        >
                                            <Modal.Header>İş Deneyimi Ekle</Modal.Header>
                                            <Form className="ui form">
                                                <Modal.Content>

                                                    <HrmsTextInput className="form-control" name="companyName" placeholder="Şirket" />
                                                    <HrmsTextInput className="form-control" name="positionName" placeholder="Pozisyon" />
                                                    <HrmsTextInput className="form-control" name="startedDate" placeholder="Başlangıç tarihi" />
                                                    <HrmsTextInput className="form-control" name="quitDate" placeholder="Ayrılma Tarihi" />

                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button>
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
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>
                                        Diller
                                        <Button onClick={() => setOpenLanguage(true)}>+</Button>
                                    </CardTitle>
                                    <Formik initialValues={initialValuesLanguage} validationSchema={schemaLanguage}
                                        onSubmit={(values) => {
                                            let candidateLanguageModel = {
                                                languageName: values.languageName,
                                                languageLevel: values.languageLevel,
                                                curriculumVitaeId: curriculumVitaeId
                                            }

                                            let candidateLanguageService = new CandidateLanguageService();
                                            candidateLanguageService.add(candidateLanguageModel).then((result) => {
                                                toast.success("Dil bilgisi eklendi.")
                                                setTimeout(() => {
                                                    refreshPage()
                                                }, 2000);
                                            })
                                        }}
                                        handleChange={(change) => console.log(change)}
                                    >


                                        <Modal
                                            onClose={() => setOpenLanguage(false)}
                                            onOpen={() => setOpenLanguage(true)}
                                            open={openLanguage}
                                        >
                                            <Modal.Header>Dil Bilgisi Ekle</Modal.Header>
                                            <Form className="ui form">
                                                <Modal.Content>

                                                    <HrmsTextInput className="form-control" name="languageName" placeholder="Dil" />
                                                    <HrmsSelect as="select" name="languageLevel">
                                                        <option value="" disabled>Seviye</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </HrmsSelect>

                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button>
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
                                    <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>
                                        Yetenekler
                                        <Button onClick={() => setOpenSkill(true)}>+</Button>
                                    </CardTitle>
                                    <Formik initialValues={initialValuesSkill} validationSchema={schemaSkill}
                                        onSubmit={(values) => {
                                            let candidateSkillModel = {
                                                skill: {
                                                    id: values.skillId
                                                },
                                                curriculumVitaeId: curriculumVitaeId
                                            }

                                            let candidateSkillService = new CandidateSkillService();
                                            candidateSkillService.add(candidateSkillModel).then((result) => {
                                                toast.success("Yetenek eklendi.")
                                                setTimeout(() => {
                                                    refreshPage()
                                                }, 2000);
                                            })
                                        }}
                                        handleChange={(change) => console.log(change)}
                                    >


                                        <Modal
                                            onClose={() => setOpenSkill(false)}
                                            onOpen={() => setOpenSkill(true)}
                                            open={openSkill}
                                        >
                                            <Modal.Header>Eğitim Bilgisi Ekle</Modal.Header>
                                            <Form className="ui form">
                                                <Modal.Content>
                                                    <HrmsSelect as="select" name="skillId">
                                                        <option value="" disabled>Yetenek</option>
                                                        {skills.map((skill) => (
                                                            <option key={skill.id} value={skill.id}>
                                                                {skill.skillName}
                                                            </option>
                                                        ))}
                                                    </HrmsSelect>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button>
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
