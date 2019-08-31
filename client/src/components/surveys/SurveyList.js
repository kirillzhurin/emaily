import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSurveys } from '../../actions';
import PieChart from './PieChart';
class SurveyList extends React.Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      let rowClassName = 'c-table__row';
      if (survey.yes + survey.no > 0) {
        rowClassName += survey.yes > survey.no ? ' c-table__row--success' : ' c-table__row--danger';
      }

      return (
        <tr className={rowClassName} key={survey._id}>
          <td className="c-table__cell">
            {survey.title}
            <small className="u-block u-text-mute">{survey.subject}</small>
          </td>
          <td className="c-table__cell"><small className="u-block u-text-mute">{survey.body}</small></td>
          <td className="c-table__cell">{new Date(survey.dateSent).toLocaleDateString() }</td>
          <td className="c-table__cell u-text-success">{survey.yes}</td>
          <td className="c-table__cell u-text-danger">{survey.no}</td>
          <td className="c-table__cell u-text-mute">{survey.pending}</td>
          <td className="c-table__cell u-text-right">
            <PieChart data={survey} />
          </td>
        </tr>
      );
    })
  }

  renderContent() {
    const { surveys, auth:{firstName, lastName}} = this.props;
  
    if (surveys.length > 0) {
      return (
        <div className="c-table-responsive@desktop">
          <table className="c-table">
            <caption className="c-table__title">
              Ongoing Surveys <small>{this.props.surveys.length} Surveys</small>
            </caption>
            <thead className="c-table__head c-table__head--slim">
              <tr className="c-table__row">
                <th className="c-table__cell c-table__cell--head">Title</th>
                <th className="c-table__cell c-table__cell--head">Text</th>
                <th className="c-table__cell c-table__cell--head">Sent On</th>
                <th className="c-table__cell c-table__cell--head">Yes</th>
                <th className="c-table__cell c-table__cell--head">No</th>
                <th className="c-table__cell c-table__cell--head">Pending</th>
                <th className="c-table__cell c-table__cell--head">Statistics</th>
              </tr>
            </thead>
            <tbody>
              {this.renderSurveys()}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="u-mv-large u-text-center">
        <h2 className="u-mb-xsmall">Hi {firstName} {lastName}! Welcome back to the Dashboard.</h2>
        <p className="u-text-mute u-h6">You don't have any surveys. You can top up credits and after to create your first survey. <Link to="surveys/new">Create a survey</Link></p>
      </div>
    );
    
  }

  render() {
    return (
      <div>
        <div className="c-toolbar u-mb-medium">
          <h3 className="c-toolbar__title has-divider">Surveys Results</h3>
          <h5 className="c-toolbar__meta u-mr-auto">Dashboard</h5>
          <Link to="/surveys/new" className="c-btn c-btn--success u-ml-small">New Survey</Link>
        </div>
        <div className="container">
          <div className="row u-mb-large">
            <div className="col-sm-12">
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);