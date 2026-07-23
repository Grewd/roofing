// ── Types ──────────────────────────────────────────────────────────────────────

export type ProjectStatus = 'Ongoing' | 'Pending' | 'Completed'
export type InspectionStatus = 'Passed' | 'In Progress' | 'Failed'
export type InventoryStatus = 'Low' | 'Adequate'
export type TicketStatus = 'Resolved' | 'In Progress'
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'
export type TaskPriority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'In Progress' | 'Pending' | 'Completed'
export type ActivityType = 'Installation' | 'Inspection' | 'Delivery'
export type ClientType = 'Corporate' | 'Hospitality' | 'Individual'
export type ProductCategory = 'Shingles' | 'Tiles' | 'Metal' | 'Accessories'
export type StaffStatus = 'On-Site' | 'Available'
export type UserType = 'internal' | 'client' | 'staff'
export type UserRole = 'admin' | 'manager' | 'supervisor' | 'client' | 'staff'

// ── Projects ───────────────────────────────────────────────────────────────────

export interface Project {
  id: number
  name: string
  location: string
  status: ProjectStatus
  progress: number
  startDate: string
  endDate: string
  value: string
  client: string
  supervisor: string
  material: string
  scope: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Karen Residential Complex',
    location: 'Karen',
    status: 'Ongoing',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-08-30',
    value: 'KES 2.5M',
    client: 'Apex Developments',
    supervisor: 'Paul Kipchoge',
    material: 'Cambridge Shingles',
    scope: 'Complete roof replacement for 12-unit residential complex',
  },
  {
    id: 2,
    name: 'Westlands Office Building',
    location: 'Westlands',
    status: 'Ongoing',
    progress: 45,
    startDate: '2024-02-20',
    endDate: '2024-09-15',
    value: 'KES 3.2M',
    client: 'Tech Hub Ltd',
    supervisor: 'Mary Njoki',
    material: 'Stone-Coated Tiles',
    scope: 'New commercial roofing installation and flashing system',
  },
  {
    id: 3,
    name: 'Kisumu Shopping Center',
    location: 'Kisumu',
    status: 'Pending',
    progress: 15,
    startDate: '2024-05-01',
    endDate: '2024-11-30',
    value: 'KES 1.8M',
    client: 'Retail Group Kenya',
    supervisor: 'James Otieno',
    material: 'Stone-Coated Tiles',
    scope: 'Large-scale shopping center roof upgrade with waterproofing',
  },
  {
    id: 4,
    name: 'Mombasa Hotel Renovation',
    location: 'Mombasa',
    status: 'Completed',
    progress: 100,
    startDate: '2023-11-01',
    endDate: '2024-04-30',
    value: 'KES 2.8M',
    client: 'Coastal Hotels',
    supervisor: 'Sarah Osei',
    material: 'Cambridge Shingles',
    scope: 'Complete hotel roof renovation with modern insulation',
  },
  {
    id: 5,
    name: 'Runda Villa Upgrade',
    location: 'Runda',
    status: 'Ongoing',
    progress: 80,
    startDate: '2024-03-10',
    endDate: '2024-07-20',
    value: 'KES 1.5M',
    client: 'Private Owner',
    supervisor: 'Paul Kipchoge',
    material: 'Corrugated Sheets',
    scope: 'Residential villa roof upgrade and maintenance work',
  },
  {
    id: 6,
    name: 'Nairobi Commercial Complex',
    location: 'Nairobi CBD',
    status: 'Pending',
    progress: 5,
    startDate: '2024-06-01',
    endDate: '2024-12-15',
    value: 'KES 4.5M',
    client: 'East Africa Builders',
    supervisor: 'David Okonkwo',
    material: 'Stone-Coated Tiles',
    scope: 'Multi-floor commercial building roof installation',
  },
]

// ── Clients ────────────────────────────────────────────────────────────────────

export interface Client {
  id: number
  name: string
  type: ClientType
  email: string
  phone: string
  location: string
  activeProjects: number
  totalValue: string
  rating: number
}

export const CLIENTS: Client[] = [
  { id: 1, name: 'Apex Developments', type: 'Corporate', email: 'info@apex.ke', phone: '+254 20 2000 100', location: 'Karen, Nairobi', activeProjects: 2, totalValue: 'KES 5.7M', rating: 4.8 },
  { id: 2, name: 'Tech Hub Ltd', type: 'Corporate', email: 'projects@techhub.ke', phone: '+254 20 3500 200', location: 'Westlands, Nairobi', activeProjects: 1, totalValue: 'KES 3.2M', rating: 4.6 },
  { id: 3, name: 'Retail Group Kenya', type: 'Corporate', email: 'procurement@retail.ke', phone: '+254 57 2028 000', location: 'Kisumu', activeProjects: 1, totalValue: 'KES 1.8M', rating: 4.5 },
  { id: 4, name: 'Coastal Hotels', type: 'Hospitality', email: 'operations@coastal.ke', phone: '+254 41 2315 000', location: 'Mombasa', activeProjects: 0, totalValue: 'KES 2.8M', rating: 4.9 },
  { id: 5, name: 'Private Owner', type: 'Individual', email: 'owner@runda.ke', phone: '+254 722 555 666', location: 'Runda, Nairobi', activeProjects: 1, totalValue: 'KES 1.5M', rating: 5.0 },
  { id: 6, name: 'East Africa Builders', type: 'Corporate', email: 'contracts@eabuilders.ke', phone: '+254 20 4000 150', location: 'Nairobi', activeProjects: 0, totalValue: 'KES 4.2M', rating: 4.7 },
]

// ── Products (Catalog) ────────────────────────────────────────────────────────

export interface Product {
  id: number
  name: string
  category: ProductCategory
  pricePerUnit: string
  supplier: string
  lifespan: string
  color: string
  rating: number
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Cambridge Shingles', category: 'Shingles', pricePerUnit: 'KES 850/m²', supplier: 'CertainTeed', lifespan: '25-30 years', color: 'Charcoal Gray', rating: 4.7, inStock: true },
  { id: 2, name: 'Stone-Coated Tiles', category: 'Tiles', pricePerUnit: 'KES 1,200/m²', supplier: 'Decra', lifespan: '40+ years', color: 'Red/Brown', rating: 4.9, inStock: true },
  { id: 3, name: 'Corrugated Sheets', category: 'Metal', pricePerUnit: 'KES 450/m²', supplier: 'Local Steel', lifespan: '15-20 years', color: 'Galvanized', rating: 4.3, inStock: true },
  { id: 4, name: 'Asphalt Shingles Premium', category: 'Shingles', pricePerUnit: 'KES 950/m²', supplier: 'GAF', lifespan: '20-25 years', color: 'Black', rating: 4.6, inStock: true },
  { id: 5, name: 'Concrete Tiles', category: 'Tiles', pricePerUnit: 'KES 1,400/m²', supplier: 'Monier', lifespan: '50+ years', color: 'Terracotta', rating: 4.8, inStock: false },
  { id: 6, name: 'Aluminum Coil', category: 'Metal', pricePerUnit: 'KES 2,200/roll', supplier: 'Hydro', lifespan: '30-40 years', color: 'Silver', rating: 4.5, inStock: true },
  { id: 7, name: 'Underlay Membrane', category: 'Accessories', pricePerUnit: 'KES 180/m²', supplier: 'Synthetics Ltd', lifespan: 'N/A', color: 'Black', rating: 4.4, inStock: true },
  { id: 8, name: 'Roof Flashing Kits', category: 'Accessories', pricePerUnit: 'KES 3,500/kit', supplier: 'Industrial Group', lifespan: '20-30 years', color: 'Zinc', rating: 4.6, inStock: true },
]

// ── Inventory ──────────────────────────────────────────────────────────────────

export interface InventoryItem {
  id: number
  name: string
  quantity: number
  unit: string
  threshold: number
  status: InventoryStatus
  supplier: string
  lastRestocked: string
  cost: string
  trend: number
}

export const INVENTORY: InventoryItem[] = [
  { id: 1, name: 'Cambridge Shingles', quantity: 12, unit: 'bundles', threshold: 20, status: 'Low', supplier: 'CertainTeed', lastRestocked: '2024-04-15', cost: 'KES 850/bundle', trend: -15 },
  { id: 2, name: 'Stone-Coated Tiles', quantity: 8, unit: 'boxes', threshold: 15, status: 'Low', supplier: 'Decra', lastRestocked: '2024-04-10', cost: 'KES 2,400/box', trend: -20 },
  { id: 3, name: 'Corrugated Sheets', quantity: 5, unit: 'pieces', threshold: 10, status: 'Low', supplier: 'Local Steel', lastRestocked: '2024-04-20', cost: 'KES 2,700/piece', trend: -25 },
  { id: 4, name: 'Roofing Nails', quantity: 50, unit: 'kg', threshold: 25, status: 'Adequate', supplier: 'Industrial Fasteners', lastRestocked: '2024-05-01', cost: 'KES 180/kg', trend: 5 },
  { id: 5, name: 'Flashing Materials', quantity: 30, unit: 'meters', threshold: 20, status: 'Adequate', supplier: 'Industrial Group', lastRestocked: '2024-04-28', cost: 'KES 450/meter', trend: 8 },
  { id: 6, name: 'Underlayment', quantity: 45, unit: 'rolls', threshold: 30, status: 'Adequate', supplier: 'Synthetics Ltd', lastRestocked: '2024-05-03', cost: 'KES 3,600/roll', trend: 10 },
  { id: 7, name: 'Roof Sealant', quantity: 15, unit: 'drums', threshold: 10, status: 'Adequate', supplier: 'Sika', lastRestocked: '2024-04-25', cost: 'KES 8,500/drum', trend: 0 },
  { id: 8, name: 'Asphalt Shingles', quantity: 22, unit: 'bundles', threshold: 25, status: 'Low', supplier: 'GAF', lastRestocked: '2024-04-18', cost: 'KES 950/bundle', trend: -18 },
]

// ── Staff ──────────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: number
  name: string
  role: string
  location: string
  status: StaffStatus
  phone: string
  email: string
  tasks: string[]
  tasksCompleted: number
  tasksTotal: number
  experience: string
}

export const STAFF: StaffMember[] = [
  {
    id: 1,
    name: 'Paul Kipchoge',
    role: 'Site Supervisor',
    location: 'Karen',
    status: 'On-Site',
    phone: '+254 722 111 222',
    email: 'paul.kipchoge@rexe.ke',
    tasks: ['Karen Residential - Roof Installation', 'Daily Site Inspection'],
    tasksCompleted: 12,
    tasksTotal: 14,
    experience: '8 years',
  },
  {
    id: 2,
    name: 'Mary Njoki',
    role: 'Safety Officer',
    location: 'Westlands',
    status: 'On-Site',
    phone: '+254 722 333 444',
    email: 'mary.njoki@rexe.ke',
    tasks: ['Westlands Office - Safety Audit', 'Weekly Safety Report'],
    tasksCompleted: 18,
    tasksTotal: 19,
    experience: '6 years',
  },
  {
    id: 3,
    name: 'James Otieno',
    role: 'Lead Technician',
    location: 'Kisumu',
    status: 'On-Site',
    phone: '+254 722 555 666',
    email: 'james.otieno@rexe.ke',
    tasks: ['Kisumu Shopping Center - Tile Installation', 'Material QC Check'],
    tasksCompleted: 15,
    tasksTotal: 17,
    experience: '10 years',
  },
  {
    id: 4,
    name: 'Sarah Osei',
    role: 'Quality Inspector',
    location: 'Mombasa',
    status: 'On-Site',
    phone: '+254 722 777 888',
    email: 'sarah.osei@rexe.ke',
    tasks: ['Mombasa Hotel - Final Inspection', 'Certification Documentation'],
    tasksCompleted: 20,
    tasksTotal: 20,
    experience: '7 years',
  },
  {
    id: 5,
    name: 'David Okonkwo',
    role: 'Project Manager',
    location: 'Head Office',
    status: 'Available',
    phone: '+254 20 2000 050',
    email: 'david.okonkwo@rexe.ke',
    tasks: ['Oversee 5 active projects', 'Client communications', 'Budget tracking'],
    tasksCompleted: 25,
    tasksTotal: 30,
    experience: '12 years',
  },
  {
    id: 6,
    name: 'Michael Mwangi',
    role: 'Junior Technician',
    location: 'Karen',
    status: 'On-Site',
    phone: '+254 722 999 000',
    email: 'michael.mwangi@rexe.ke',
    tasks: ['Material Transport', 'Site Cleanup'],
    tasksCompleted: 8,
    tasksTotal: 10,
    experience: '2 years',
  },
]

// ── Inspections ────────────────────────────────────────────────────────────────

export interface Inspection {
  id: number
  project: string
  type: string
  date: string
  inspector: string
  status: InspectionStatus
  score: number | null
  notes: string
}

export const INSPECTIONS: Inspection[] = [
  { id: 1, project: 'Karen Residential Complex', type: 'Material Inspection', date: '2024-05-10', inspector: 'Sarah Osei', status: 'Passed', score: 95, notes: 'All materials meet specifications' },
  { id: 2, project: 'Westlands Office Building', type: 'Quality Control', date: '2024-05-08', inspector: 'James Otieno', status: 'Passed', score: 92, notes: 'Minor alignment adjustments noted' },
  { id: 3, project: 'Kisumu Shopping Center', type: 'Pre-Installation', date: '2024-05-05', inspector: 'Mary Njoki', status: 'Passed', score: 98, notes: 'Roof structure verified and approved' },
  { id: 4, project: 'Runda Villa Upgrade', type: 'Final Inspection', date: '2024-05-01', inspector: 'Paul Kipchoge', status: 'Passed', score: 96, notes: 'Project ready for handover' },
  { id: 5, project: 'Karen Residential Complex', type: 'Safety Audit', date: '2024-04-28', inspector: 'Mary Njoki', status: 'In Progress', score: null, notes: 'Ongoing safety assessment' },
  { id: 6, project: 'Westlands Office Building', type: 'Material Inspection', date: '2024-04-25', inspector: 'Sarah Osei', status: 'Passed', score: 91, notes: 'All tiles verified and certified' },
]

// ── Staff Tasks ────────────────────────────────────────────────────────────────

export interface StaffTask {
  id: number
  title: string
  project: string
  location: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  assignedTo: string
  progress: number
}

export const STAFF_TASKS: StaffTask[] = [
  { id: 1, title: 'Roof Installation - Block A', project: 'Karen Residential Complex', location: 'Karen, Nairobi', status: 'In Progress', priority: 'High', dueDate: '2024-05-25', assignedTo: 'James Otieno', progress: 70 },
  { id: 2, title: 'Material Quality Inspection', project: 'Karen Residential Complex', location: 'Karen, Nairobi', status: 'Completed', priority: 'Medium', dueDate: '2024-05-15', assignedTo: 'Sarah Osei', progress: 100 },
  { id: 3, title: 'Site Safety Audit', project: 'Westlands Office Building', location: 'Westlands, Nairobi', status: 'Pending', priority: 'High', dueDate: '2024-05-20', assignedTo: 'Mary Njoki', progress: 0 },
  { id: 4, title: 'Roof Installation - Block B', project: 'Karen Residential Complex', location: 'Karen, Nairobi', status: 'In Progress', priority: 'High', dueDate: '2024-06-05', assignedTo: 'James Otieno', progress: 45 },
  { id: 5, title: 'Daily Site Inspection', project: 'Karen Residential Complex', location: 'Karen', status: 'In Progress', priority: 'High', dueDate: '2024-05-15', assignedTo: 'Paul Kipchoge', progress: 30 },
  { id: 6, title: 'Material Quality Check', project: 'Westlands Office Building', location: 'Westlands', status: 'Pending', priority: 'Medium', dueDate: '2024-05-16', assignedTo: 'Mary Njoki', progress: 0 },
  { id: 7, title: 'Safety Compliance Report', project: 'Kisumu Shopping Center', location: 'Kisumu', status: 'Pending', priority: 'High', dueDate: '2024-05-17', assignedTo: 'Mary Njoki', progress: 0 },
  { id: 8, title: 'Equipment Maintenance', project: 'General', location: 'Head Office', status: 'Pending', priority: 'Low', dueDate: '2024-05-18', assignedTo: 'Michael Mwangi', progress: 0 },
]

// ── Staff Schedule ─────────────────────────────────────────────────────────────

export interface ScheduleEntry {
  id: number
  date: string
  day: string
  location: string
  project: string
  activity: string
  team: string[]
  time: string
  type: ActivityType
}

export const SCHEDULES: ScheduleEntry[] = [
  { id: 1, date: '2024-05-16', day: 'Thursday', location: 'Karen, Nairobi', project: 'Karen Residential Complex', activity: 'Roof Installation - Block A', team: ['James Otieno', 'Michael Mwangi', 'Joseph Kipchoge'], time: '08:00 AM - 05:00 PM', type: 'Installation' },
  { id: 2, date: '2024-05-17', day: 'Friday', location: 'Westlands, Nairobi', project: 'Westlands Office Building', activity: 'Site Safety Inspection', team: ['Mary Njoki', 'Sarah Osei'], time: '09:00 AM - 03:00 PM', type: 'Inspection' },
  { id: 3, date: '2024-05-20', day: 'Monday', location: 'Karen, Nairobi', project: 'Karen Residential Complex', activity: 'Material Delivery & Inspection', team: ['James Otieno', 'Michael Mwangi', 'Paul Kipchoge'], time: '08:00 AM - 12:00 PM', type: 'Delivery' },
  { id: 4, date: '2024-05-21', day: 'Tuesday', location: 'Karen, Nairobi', project: 'Karen Residential Complex', activity: 'Roof Installation - Block B', team: ['James Otieno', 'Michael Mwangi', 'Joseph Kipchoge'], time: '08:00 AM - 05:00 PM', type: 'Installation' },
]

// ── Staff Dashboard ────────────────────────────────────────────────────────────

export interface AssignedProject {
  id: number
  name: string
  location: string
  role: string
  progress: number
  team: string[]
}

export const ASSIGNED_PROJECTS: AssignedProject[] = [
  { id: 1, name: 'Karen Residential Complex', location: 'Karen', role: 'Lead Technician', progress: 65, team: ['Paul', 'Michael'] },
  { id: 2, name: 'Westlands Office Building', location: 'Westlands', role: 'Safety Officer', progress: 45, team: ['Mary', 'Sarah'] },
]

export const WEEKLY_SCHEDULE = [
  { date: '2024-05-15', status: 'Working', location: 'Karen' },
  { date: '2024-05-16', status: 'Working', location: 'Westlands' },
  { date: '2024-05-17', status: 'Working', location: 'Kisumu' },
  { date: '2024-05-18', status: 'Day Off', location: 'N/A' },
  { date: '2024-05-19', status: 'Working', location: 'Karen' },
]

// ── Client Dashboard ───────────────────────────────────────────────────────────

export interface ClientProject {
  id: number
  name: string
  location: string
  status: string
  progress: number
  budget: string
  spent: string
}

export const CLIENT_PROJECTS: ClientProject[] = [
  { id: 1, name: 'Main Office Building Roof', location: 'Nairobi', status: 'In Progress', progress: 65, budget: 'KES 2.5M', spent: 'KES 1.6M' },
  { id: 2, name: 'Warehouse Extension', location: 'Nairobi', status: 'Pending', progress: 0, budget: 'KES 1.2M', spent: 'KES 0.2M' },
  { id: 3, name: 'Previous Facility Upgrade', location: 'Karen', status: 'Completed', progress: 100, budget: 'KES 800K', spent: 'KES 800K' },
]

export const PAYMENT_CHART = [
  { month: 'January', amount: 0 },
  { month: 'February', amount: 0 },
  { month: 'March', amount: 0 },
  { month: 'April', amount: 600000 },
  { month: 'May', amount: 800000 },
  { month: 'June', amount: 400000 },
]

// ── Client Projects (dedicated page) ──────────────────────────────────────────

export interface ClientProjectDetail {
  id: number
  name: string
  location: string
  status: string
  progress: number
  startDate: string
  endDate: string
  budget: string
  spent: string
  supervisor: string
}

export const CLIENT_PROJECT_DETAILS: ClientProjectDetail[] = [
  { id: 1, name: 'Karen Residential Complex - Phase 1', location: 'Karen, Nairobi', status: 'Ongoing', progress: 65, startDate: '2024-01-15', endDate: '2024-08-30', budget: 'KES 2.5M', spent: 'KES 1.6M', supervisor: 'Paul Kipchoge' },
  { id: 2, name: 'Karen Residential Complex - Phase 2', location: 'Karen, Nairobi', status: 'Pending', progress: 0, startDate: '2024-09-01', endDate: '2024-12-31', budget: 'KES 3.2M', spent: 'KES 0', supervisor: 'TBD' },
]

// ── Invoices ───────────────────────────────────────────────────────────────────

export interface Invoice {
  id: string
  project: string
  amount: string
  date: string
  dueDate: string
  status: InvoiceStatus
  description: string
}

export const INVOICES: Invoice[] = [
  { id: 'INV-001', project: 'Karen Residential Complex - Phase 1', amount: 'KES 1,600,000', date: '2024-05-10', dueDate: '2024-06-10', status: 'Paid', description: 'Roofing materials and installation labor - 50% payment' },
  { id: 'INV-002', project: 'Karen Residential Complex - Phase 1', amount: 'KES 900,000', date: '2024-04-10', dueDate: '2024-05-10', status: 'Paid', description: 'Initial deposit for materials procurement' },
  { id: 'INV-003', project: 'Karen Residential Complex - Phase 2', amount: 'KES 3,200,000', date: '2024-08-01', dueDate: '2024-09-01', status: 'Pending', description: 'Phase 2 project estimate and quotation' },
]

// ── Support Tickets ────────────────────────────────────────────────────────────

export interface SupportTicket {
  id: number
  subject: string
  status: TicketStatus
  date: string
  response: string
}

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: 1, subject: 'Roof Inspection Query', status: 'Resolved', date: '2024-05-10', response: '2 hours' },
  { id: 2, subject: 'Invoice Clarification', status: 'In Progress', date: '2024-05-12', response: 'Awaiting reply' },
  { id: 3, subject: 'Project Timeline Update', status: 'Resolved', date: '2024-05-08', response: '4 hours' },
]

// ── Estimator ──────────────────────────────────────────────────────────────────

export interface Material {
  id: string
  name: string
  pricePerSqm: number
}

export const ESTIMATOR_MATERIALS: Material[] = [
  { id: 'cambridge', name: 'Cambridge Shingles', pricePerSqm: 850 },
  { id: 'stone-coated', name: 'Stone-Coated Tiles', pricePerSqm: 1200 },
  { id: 'corrugated', name: 'Corrugated Sheets', pricePerSqm: 450 },
]

export const PITCH_MULTIPLIERS: Record<string, number> = {
  low: 1.0,
  medium: 1.15,
  high: 1.35,
}

// ── Revenue Chart ──────────────────────────────────────────────────────────────

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 450 },
  { month: 'Feb', revenue: 620 },
  { month: 'Mar', revenue: 580 },
  { month: 'Apr', revenue: 890 },
  { month: 'May', revenue: 750 },
  { month: 'Jun', revenue: 1100 },
]

// ── Low Stock Items (dashboard widget) ─────────────────────────────────────────

export const LOW_STOCK_ITEMS = [
  { name: 'Cambridge Shingles', stock: 12, unit: 'bundles', threshold: 20 },
  { name: 'Stone-Coated Tiles', stock: 8, unit: 'boxes', threshold: 15 },
  { name: 'Corrugated Sheets', stock: 5, unit: 'pieces', threshold: 10 },
]

// ── Staff On-Site (dashboard widget) ──────────────────────────────────────────

export const STAFF_ON_SITE = [
  { id: 1, name: 'Paul Kipchoge', role: 'Site Supervisor', location: 'Karen' },
  { id: 2, name: 'Mary Njoki', role: 'Safety Officer', location: 'Westlands' },
  { id: 3, name: 'James Otieno', role: 'Lead Technician', location: 'Kisumu' },
  { id: 4, name: 'Sarah Osei', role: 'Quality Inspector', location: 'Mombasa' },
]
