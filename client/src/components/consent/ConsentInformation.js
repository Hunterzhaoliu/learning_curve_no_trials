import React, { Component } from "react";
import { connect } from "react-redux";

class ConsentInformation extends Component {
  render() {
    return (
      <div className="text-align-left">
        <p>
          Your child is invited to participate in a study conducted by Dr.
          Allyson Mackey from the Psychology department at the University of
          Pennsylvania. We are looking for children and adolescents to help us
          learn about learning and cognitive development. We would love for your
          child to help us by being a participant in this study! If you would
          like for your child to participate, please read and fill out this
          permission form. Feel free to ask the experimenter any questions.
        </p>
        <br />
        <br />
        <p>
          <i>Procedure: </i>In this study, your child will complete computerized
          and non-computerized tasks that assess learning and cognitive skills.
          Your child will participate in a 20-30-minute session. This session
          will be audio recorded so we can double check responses. Some sessions
          may be video recorded with your permission.
        </p>
        <br />
        <br />
        <p>
          <i>Risks: </i>This study presents no risks beyond what your child
          would encounter in his or her everyday life. These measures do not
          manipulate your behavior and will not induce more stress than what is
          naturally involved in taking a test.
        </p>
        <br />
        <br />
        <p>
          <i>Benefits: </i>There is no direct benefit to participating in this
          study, but there is a benefit to society in general from knowledge
          that may be gained.
        </p>
        <br />
        <br />
        <p>
          <i>Confidentiality: </i>Your name and your child’s name will only be
          recorded on this consent form and will never be associated with your
          child’s responses. Access to this form, to your child’s responses, any
          audio-recordings, and video-recordings of your child will be limited
          to trained research staff. All of these materials will be stored in a
          locked file cabinet in our laboratory and on password protected
          computers. If information from this study is published or presented at
          scientific meetings, we will keep you and your child’s name
          confidential. We may share anonymous data with other researchers.
          Authorized representatives of Penn’s Institutional Review Board, a
          committee responsible for protecting the rights of research
          participants, may be provided access to records that identify you and
          your child.
        </p>
        <br />
        <br />
        <p>
          <i>Withdrawal from study: </i>You or your child may withdraw at any
          time without prejudicing any present or future connection you may have
          with the University of Pennsylvania. If your child does not want to
          participate in the study, his or her wishes will be respected, even if
          you have given your permission.
        </p>
        <br />
        <br />
        <p>
          <i>Questions: </i> If you have any additional questions about this
          research study, please feel free to email us (mackeylab@sas.upenn.edu)
          or call us (215-573-1670).
        </p>
        <br />
        <br />
        <p>
          <i>Participant's rights: </i>If you want more information about your
          child’s rights as participants in this research study, or if you would
          like to talk to someone other than a member of the study, please
          contact the Office of Regulatory Affairs at (215) 898-2614.
        </p>
        <br />
        <br />
        <p>
          <b>
            I have read and understood this consent form. I have been given the
            opportunity to ask questions, and my questions have been answered to
            my satisfaction. I agree to allow my child to participate in this
            study.
          </b>
        </p>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(ConsentInformation);
