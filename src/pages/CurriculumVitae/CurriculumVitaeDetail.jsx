import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Progress,
    Row
} from "reactstrap";
import { List } from 'semantic-ui-react'
import CurriculumVitaeService from '../../services/curriculumVitaeService';

export default function CurriculumVitaeDetail() {
    let { curriculumVitaeId } = useParams();

    const [curriculumVitae, setCurriculumVitae] = useState({})

    useEffect(() => {
        let curriculumVitaeService = new CurriculumVitaeService()

        curriculumVitaeService
            .getCurriculumVitaesById(curriculumVitaeId)
            .then((result) => setCurriculumVitae(result.data.data))
    }, [])


    return (
        <div>
            <Card className="card-stats mb-4 mt-5 mb-lg-0">
                <CardBody>
                    <Row>
                        <div className="col-md-12">
                            {
                                curriculumVitae.coverLetters?.map((coverLetter) => (
                                    <div>
                                        <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>{coverLetter.coverLetterName}</CardTitle>
                                        <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                                        <CardText>{coverLetter.coverLetter}</CardText>
                                    </div>

                                ))
                            }

                        </div>
                    </Row>
                </CardBody>
            </Card>
            <Card className="card-stats mb-4 mt-5 mb-lg-0">
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
                            <CardTitle style={{ textAlign: "left", fontSize: "1.5em" }}>Eğitim Bilgileri</CardTitle>
                            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                            {
                                curriculumVitae.candidateEducations?.map((candidateEducation) => (
                                    <List className="text-left" key={candidateEducation.id}>
                                        <List.Item>{candidateEducation.universityName}</List.Item>
                                        <List.Item>{candidateEducation.departmentName}, {candidateEducation.degree}</List.Item>
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
        </div>
    )
}
