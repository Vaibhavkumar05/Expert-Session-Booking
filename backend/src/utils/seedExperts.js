const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Expert = require('../models/Expert');

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Expert.deleteMany({});

  await Expert.insertMany([
    {
      name: 'Dr. Priya Sharma',
      category: 'Career Coaching',
      experience: 8,
      rating: 4.8,
      bio: 'Helps professionals transition into leadership roles.',
      availableSlots: [
        { date: '2026-02-21', slots: ['10:00', '11:00', '14:00'] },
        { date: '2026-02-22', slots: ['09:30', '13:00', '16:00'] },
      ],
    },
    {
      name: 'Rohit Mehta',
      category: 'Finance',
      experience: 12,
      rating: 4.6,
      bio: 'Personal finance and wealth planning expert.',
      availableSlots: [
        { date: '2026-02-21', slots: ['09:00', '15:00'] },
        { date: '2026-02-23', slots: ['10:30', '12:00', '17:00'] },
      ],
    },
    {
      name: 'Aisha Verma',
      category: 'Mental Wellness',
      experience: 9,
      rating: 4.9,
      bio: 'Guides clients on stress management, resilience, and work-life balance.',
      availableSlots: [
        { date: '2026-02-24', slots: ['08:30', '11:30', '15:30'] },
        { date: '2026-02-25', slots: ['10:00', '13:30'] },
      ],
    },
    {
      name: 'Karan Malhotra',
      category: 'Technology Consulting',
      experience: 11,
      rating: 4.7,
      bio: 'Advises startups and teams on architecture, scaling, and product strategy.',
      availableSlots: [
        { date: '2026-02-24', slots: ['09:30', '12:00', '16:30'] },
        { date: '2026-02-26', slots: ['10:30', '14:00'] },
      ],
    },
    {
      name: 'Neha Kapoor',
      category: 'Legal Advisory',
      experience: 10,
      rating: 4.5,
      bio: 'Supports founders and professionals with contracts, compliance, and risk reviews.',
      availableSlots: [
        { date: '2026-02-27', slots: ['09:00', '11:00', '15:00'] },
        { date: '2026-02-28', slots: ['10:30', '13:30'] },
      ],
    },
    {
      name: 'Arjun Iyer',
      category: 'Marketing Strategy',
      experience: 7,
      rating: 4.6,
      bio: 'Helps teams improve brand positioning, campaign performance, and growth funnels.',
      availableSlots: [
        { date: '2026-02-27', slots: ['08:30', '12:30', '16:00'] },
        { date: '2026-03-01', slots: ['10:00', '14:30'] },
      ],
    },
    {
      name: 'Sana Qureshi',
      category: 'Health & Nutrition',
      experience: 9,
      rating: 4.8,
      bio: 'Creates practical nutrition and wellness plans for sustainable lifestyle improvement.',
      availableSlots: [
        { date: '2026-02-28', slots: ['09:30', '11:30', '17:00'] },
        { date: '2026-03-02', slots: ['10:30', '15:30'] },
      ],
    },
    {
      name: 'Vikram Sethi',
      category: 'Product Management',
      experience: 13,
      rating: 4.7,
      bio: 'Mentors product teams on roadmap planning, execution, and stakeholder alignment.',
      availableSlots: [
        { date: '2026-03-01', slots: ['09:00', '13:00', '16:30'] },
        { date: '2026-03-03', slots: ['10:00', '14:00'] },
      ],
    },
    {
      name: 'Meera Nair',
      category: 'Communication Skills',
      experience: 6,
      rating: 4.6,
      bio: 'Coaches professionals on presentations, storytelling, and executive communication.',
      availableSlots: [
        { date: '2026-03-02', slots: ['08:00', '12:00', '15:00'] },
        { date: '2026-03-04', slots: ['11:00', '16:00'] },
      ],
    },
    {
      name: 'Devansh Rao',
      category: 'Cybersecurity',
      experience: 10,
      rating: 4.8,
      bio: 'Advises teams on threat modeling, cloud security, and incident readiness.',
      availableSlots: [
        { date: '2026-03-05', slots: ['09:00', '11:30', '15:30'] },
        { date: '2026-03-06', slots: ['10:00', '13:00'] },
      ],
    },
    {
      name: 'Ira Sen',
      category: 'Data Science',
      experience: 8,
      rating: 4.7,
      bio: 'Helps organizations build ML roadmaps and production analytics workflows.',
      availableSlots: [
        { date: '2026-03-05', slots: ['08:30', '12:00', '16:00'] },
        { date: '2026-03-07', slots: ['10:30', '14:30'] },
      ],
    },
    {
      name: 'Nikhil Arora',
      category: 'Sales Enablement',
      experience: 11,
      rating: 4.6,
      bio: 'Supports B2B teams with pipeline strategy, messaging, and deal coaching.',
      availableSlots: [
        { date: '2026-03-06', slots: ['09:30', '12:30', '17:00'] },
        { date: '2026-03-08', slots: ['10:00', '15:00'] },
      ],
    },
    {
      name: 'Pooja Bhatia',
      category: 'Operations Excellence',
      experience: 9,
      rating: 4.7,
      bio: 'Improves process efficiency, SLA design, and cross-functional execution.',
      availableSlots: [
        { date: '2026-03-07', slots: ['09:00', '11:00', '14:00'] },
        { date: '2026-03-09', slots: ['10:30', '13:30'] },
      ],
    },
    {
      name: 'Harshil Jain',
      category: 'Cloud Architecture',
      experience: 12,
      rating: 4.8,
      bio: 'Designs scalable cloud systems with cost, reliability, and security in mind.',
      availableSlots: [
        { date: '2026-03-08', slots: ['08:00', '12:00', '16:30'] },
        { date: '2026-03-10', slots: ['10:00', '14:00'] },
      ],
    },
    {
      name: 'Rhea Mallick',
      category: 'HR Advisory',
      experience: 7,
      rating: 4.5,
      bio: 'Guides hiring strategy, org design, and performance management practices.',
      availableSlots: [
        { date: '2026-03-09', slots: ['09:30', '13:00', '15:30'] },
        { date: '2026-03-11', slots: ['11:00', '16:00'] },
      ],
    },
    {
      name: 'Kabir Wadhwa',
      category: 'UI/UX Design',
      experience: 8,
      rating: 4.7,
      bio: 'Mentors teams on usability research, interaction design, and design systems.',
      availableSlots: [
        { date: '2026-03-10', slots: ['09:00', '12:30', '17:00'] },
        { date: '2026-03-12', slots: ['10:30', '14:30'] },
      ],
    },
    {
      name: 'Ritika Ghosh',
      category: 'Public Speaking',
      experience: 6,
      rating: 4.6,
      bio: 'Coaches founders and leaders for confident speaking and stage presence.',
      availableSlots: [
        { date: '2026-03-11', slots: ['08:30', '11:30', '15:00'] },
        { date: '2026-03-13', slots: ['10:00', '13:00'] },
      ],
    },
    {
      name: 'Samarth Kulkarni',
      category: 'Startup Fundraising',
      experience: 9,
      rating: 4.8,
      bio: 'Helps founders craft fundraising narratives, metrics, and investor strategy.',
      availableSlots: [
        { date: '2026-03-12', slots: ['09:30', '12:00', '16:00'] },
        { date: '2026-03-14', slots: ['11:00', '14:00'] },
      ],
    },
    {
      name: 'Tanvi Chopra',
      category: 'Blockchain Advisory',
      experience: 8,
      rating: 4.6,
      bio: 'Advises product teams on blockchain use cases, token models, and compliance basics.',
      availableSlots: [
        { date: '2026-03-15', slots: ['09:00', '12:00', '16:00'] },
        { date: '2026-03-16', slots: ['10:30', '14:30'] },
      ],
    },
    {
      name: 'Manav Deshpande',
      category: 'DevOps Automation',
      experience: 10,
      rating: 4.7,
      bio: 'Helps teams improve CI/CD, observability, and deployment reliability.',
      availableSlots: [
        { date: '2026-03-15', slots: ['08:30', '11:30', '15:30'] },
        { date: '2026-03-17', slots: ['10:00', '13:00'] },
      ],
    },
    {
      name: 'Naina Bedi',
      category: 'Customer Success',
      experience: 7,
      rating: 4.6,
      bio: 'Guides SaaS teams on onboarding design, retention strategy, and churn reduction.',
      availableSlots: [
        { date: '2026-03-16', slots: ['09:30', '12:30', '17:00'] },
        { date: '2026-03-18', slots: ['10:00', '14:00'] },
      ],
    },
    {
      name: 'Aarav Bansal',
      category: 'Business Analytics',
      experience: 9,
      rating: 4.7,
      bio: 'Supports leaders in KPI design, reporting, and data-driven decision frameworks.',
      availableSlots: [
        { date: '2026-03-17', slots: ['09:00', '11:00', '14:30'] },
        { date: '2026-03-19', slots: ['10:30', '15:00'] },
      ],
    },
    {
      name: 'Simran Kohli',
      category: 'Brand Strategy',
      experience: 11,
      rating: 4.8,
      bio: 'Works with founders on brand positioning, messaging architecture, and go-to-market clarity.',
      availableSlots: [
        { date: '2026-03-18', slots: ['08:00', '12:00', '16:30'] },
        { date: '2026-03-20', slots: ['10:00', '14:00'] },
      ],
    },
    {
      name: 'Parth Taneja',
      category: 'E-commerce Growth',
      experience: 8,
      rating: 4.6,
      bio: 'Optimizes online stores for conversion, retention, and performance marketing outcomes.',
      availableSlots: [
        { date: '2026-03-19', slots: ['09:30', '13:00', '15:30'] },
        { date: '2026-03-21', slots: ['11:00', '16:00'] },
      ],
    },
    {
      name: 'Ishita Menon',
      category: 'AI Product Strategy',
      experience: 9,
      rating: 4.8,
      bio: 'Mentors teams on AI-first product scoping, model evaluation, and responsible rollout.',
      availableSlots: [
        { date: '2026-03-20', slots: ['09:00', '12:30', '17:00'] },
        { date: '2026-03-22', slots: ['10:30', '14:30'] },
      ],
    },
    {
      name: 'Rahul Dutta',
      category: 'Supply Chain Planning',
      experience: 12,
      rating: 4.7,
      bio: 'Improves demand planning, inventory strategy, and fulfillment operations.',
      availableSlots: [
        { date: '2026-03-21', slots: ['08:30', '11:30', '15:00'] },
        { date: '2026-03-23', slots: ['10:00', '13:00'] },
      ],
    },
    {
      name: 'Jhanvi Arvind',
      category: 'Personal Branding',
      experience: 6,
      rating: 4.6,
      bio: 'Coaches professionals on online presence, content positioning, and authority building.',
      availableSlots: [
        { date: '2026-03-22', slots: ['09:30', '12:00', '16:00'] },
        { date: '2026-03-24', slots: ['11:00', '14:00'] },
      ],
    },
  ]);

  // eslint-disable-next-line no-console
  console.log('Seeded experts');
  await mongoose.disconnect();
};

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
