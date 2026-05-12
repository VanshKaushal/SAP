import React, { useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import './WorkflowGraph.css';

const WorkflowGraph: React.FC = () => {
  const { workflows } = useWorkflowStore();

  const data = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];
    const departments = new Set<string>();

    // Add department central nodes
    workflows.forEach(wf => departments.add(wf.department));
    
    Array.from(departments).forEach((dept, idx) => {
      nodes.push({
        id: `dept-${dept}`,
        name: dept,
        group: idx + 1,
        type: 'Department',
        val: 15,
        color: `hsl(${idx * 70}, 70%, 60%)`
      });
    });

    // Add workflow nodes and connect to departments
    workflows.forEach((wf, idx) => {
      const color = wf.status === 'SLA_RISK' ? 'rgba(255, 69, 58, 0.9)' : 
                    wf.status === 'APPROVED' ? 'rgba(52, 199, 89, 0.9)' : 
                    wf.status === 'ESCALATED' ? 'rgba(255, 159, 10, 0.9)' : 'rgba(0, 122, 255, 0.9)';
      
      nodes.push({
        id: wf.id,
        name: wf.id,
        title: wf.title,
        group: Array.from(departments).indexOf(wf.department) + 1,
        type: 'Workflow',
        status: wf.status,
        val: wf.priority === 'CRITICAL' ? 12 : 8,
        color: color,
        priority: wf.priority
      });

      links.push({
        source: wf.id,
        target: `dept-${wf.department}`,
        value: 1,
        color: wf.status === 'SLA_RISK' ? 'rgba(255, 69, 58, 0.2)' : 'rgba(255, 255, 255, 0.08)',
        curvature: 0.2
      });

      // Add some random cross-departmental links for "dependency tracing"
      if (idx > 0 && Math.random() > 0.85) {
        links.push({
          source: wf.id,
          target: workflows[idx - 1].id,
          value: 2,
          color: 'rgba(0, 242, 255, 0.15)',
          curvature: 0.5,
          dashed: true
        });
      }
    });

    return { nodes, links };
  }, [workflows]);


  return (
    <div className="workflow-graph-container">
      <header className="graph-header">
        <div className="header-top">
          <div className="header-info">
            <h1 className="text-gradient">NEURAL WORKFLOW CORTEX</h1>
            <p>Autonomous dependency mapping and global orchestration topology.</p>
          </div>
          <div className="header-meta">
            <div className="meta-item">
              <span className="label">ACTIVE NODES:</span>
              <span className="value">{workflows.length}</span>
            </div>
            <div className="meta-item">
              <span className="label">SYNC_STATUS:</span>
              <span className="value text-accent-teal">STABLE</span>
            </div>
          </div>
        </div>
        <div className="graph-controls glass">
          <div className="control-item">
            <Network size={14} /> <span>TOPOLOGY: DISTRIBUTED</span>
          </div>
          <div className="control-item">
            <Zap size={14} className="text-accent-blue" /> <span>PULSE_SYNC: ACTIVE</span>
          </div>
          <div className="control-item danger">
            <ShieldAlert size={14} /> <span>RISK_NODES: {workflows.filter(w => w.status === 'SLA_RISK').length}</span>
          </div>
        </div>
      </header>
      
      <div className="graph-canvas-wrapper glass-card">
        <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="group"
          nodeLabel={(node: any) => `${node.type}: ${node.name} ${node.title ? `(${node.title})` : ''}`}
          linkColor={(link: any) => link.color}
          linkCurvature="curvature"
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={(link: any) => link.value * 0.01}
          linkDirectionalParticleColor={(link: any) => link.color?.replace('0.2', '0.8').replace('0.08', '0.4')}

          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const isDept = node.type === 'Department';
            const radius = node.val / (globalScale * 0.4);
            const t = Date.now() / 1000;

            // Draw active node aura (energy)
            if (node.status === 'SLA_RISK' || node.priority === 'CRITICAL') {
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius * (1.5 + Math.sin(t * 4) * 0.2), 0, 2 * Math.PI, false);
              const aura = ctx.createRadialGradient(node.x, node.y, radius, node.x, node.y, radius * 2.5);
              aura.addColorStop(0, node.color.replace('0.9', '0.2'));
              aura.addColorStop(1, 'transparent');
              ctx.fillStyle = aura;
              ctx.fill();
            }
            
            // Draw node body
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(0.8, node.color.replace('0.9', '0.4'));
            gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
            
            ctx.fillStyle = gradient;
            ctx.shadowColor = node.color;
            ctx.shadowBlur = (isDept ? 20 : 10) / globalScale;
            ctx.fill();

            // Node Ring
            ctx.strokeStyle = isDept ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1 / globalScale;
            ctx.stroke();

            // Text Label
            const fontSize = (isDept ? 14 : 9) / globalScale;
            ctx.font = `${isDept ? '800' : '600'} ${fontSize}px 'Inter'`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isDept ? '#ffffff' : 'rgba(255,255,255,0.7)';
            ctx.shadowBlur = 0;
            ctx.fillText(label, node.x, node.y + radius + (8 / globalScale));
          }}


          backgroundColor="rgba(0,0,0,0)"
          width={window.innerWidth - 320}
          height={window.innerHeight - 250}
          enableNodeDrag={true}
        />
      </div>
    </div>
  );
};

export default WorkflowGraph;

