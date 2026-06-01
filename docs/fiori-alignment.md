# Fiori Design Alignment

This document maps the custom React UI components of the SAP Cognitive Workflow Orchestra to standard SAP Fiori floorplans and design concepts.

## 1. Overview Page (OVP)
**Current Implementation**: `Dashboard.tsx`
**Fiori Alignment**: The dashboard functions as a Fiori Overview Page (OVP). It contains various cards (analytical cards, list cards) that give the user a high-level view of the system's status.
- **KPI Tags** map to *Fiori KPI Header Cards*.
- **Charts** map to *Fiori Analytical Cards*.

## 2. Worklist
**Current Implementation**: `ApprovalCenter.tsx` & `openui5-approval`
**Fiori Alignment**: We have integrated a native OpenUI5 implementation for the Approval Center, which strictly follows the **Fiori Worklist** pattern. It allows users to quickly review and process incoming items.

## 3. Object Management (Master-Detail)
**Current Implementation**: `User Management` & `Settings`
**Fiori Alignment**: These screens align with the Fiori Master-Detail layout, where a list of objects is displayed on the left (Master) and the object details/configuration are shown on the right (Detail).

## 4. Analytical List Page (ALP)
**Current Implementation**: `WorkflowGraph` & `Analytics`
**Fiori Alignment**: Provides deeper insights using hybrid views of data tables and visualizations, aligning perfectly with Fiori's Analytical List Page pattern, often used for intelligent system monitoring.

## Design Language Integration
While the outer shell remains a high-performance React application, the styling (`index.css` & `App.css`) has been adjusted to mimic the **SAP Horizon** theme, incorporating its color palette, typography, and spacing principles to provide a cohesive user experience.
