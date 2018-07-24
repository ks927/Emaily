import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    state = {
        showFormReview: false,
    };

    renderContent() {
        if(this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
        }
        // onSubmit of surveyform sets showFormReview to true
        return <SurveyForm 
                    onSurveySubmit={() => this.setState({ showFormReview: true })}
                />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

// Resets the form when navigating away from it (i.e. 'Cancel' button)
export default reduxForm({
    form: 'surveyForm',
})(SurveyNew);