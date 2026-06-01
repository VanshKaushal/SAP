namespace sap.orchestra;

entity Workflows {
    key id : String;
    title : String;
    status : String enum {
        PENDING;
        UNDER_REVIEW;
        APPROVED;
        REJECTED;
        ESCALATED;
        SLA_RISK;
        DELAYED;
    };
    department : Association to Departments;
    assignedTo : Association to Users;
    priority : String enum {
        LOW;
        MEDIUM;
        HIGH;
        CRITICAL;
    };
    riskLevel : String;
    slaDeadline : DateTime;
    delayHours : Integer;
    createdAt : DateTime;
    description : String;
    
    tasks : Composition of many Approvals on tasks.workflow = $self;
    dependencies : Composition of many WorkflowDependencies on dependencies.workflow = $self;
    riskAssessments: Composition of many RiskAssessments on riskAssessments.workflow = $self;
}

entity Approvals {
    key id : String;
    workflow : Association to Workflows;
    reviewer : Association to Users;
    completionStatus : String;
}

entity Departments {
    key id : String;
    name : String;
}

entity Users {
    key id : Integer;
    email : String;
    role : String;
    department : Association to Departments;
    approvalAuthority : Double;
}

entity Notifications {
    key id : String;
    severity : String;
    message : String;
    type : String;
    title : String;
    workflow : Association to Workflows;
    timestamp : DateTime;
}

entity RiskAssessments {
    key id : String;
    workflow : Association to Workflows;
    score : Double;
    factors : String;
    assessedAt : DateTime;
}

entity SLAProfiles {
    key id : String;
    name : String;
    maxDelayHours : Integer;
    escalationPath : String;
}

entity AnalyticsSnapshots {
    key id : Integer;
    timestamp : DateTime;
    throughput : Double;
    slaCompliance : Double;
    bottleneckScore : Double;
    riskIndex : Double;
    systemHealth : Double;
    aiConfidence : Double;
}

entity WorkflowDependencies {
    key id : String;
    workflow : Association to Workflows;
    dependsOn : Association to Workflows;
    type : String;
}
