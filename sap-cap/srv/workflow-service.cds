using sap.orchestra as db from '../db/schema';

service WorkflowService {
    entity Workflows as projection on db.Workflows;
    entity Approvals as projection on db.Approvals;
    entity Departments as projection on db.Departments;
    entity Users as projection on db.Users;
    entity Notifications as projection on db.Notifications;
    entity RiskAssessments as projection on db.RiskAssessments;
    entity Analytics as projection on db.AnalyticsSnapshots;
    entity SLAProfiles as projection on db.SLAProfiles;
    entity WorkflowDependencies as projection on db.WorkflowDependencies;
}
