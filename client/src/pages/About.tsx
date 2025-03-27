import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { stats } from '@/data/content';
import { BadgeCheck, Award, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout 
      title="About Quality Sensei - Our Story and Mission" 
      description="Learn about Quality Sensei's mission to empower software testers through innovative education and training programs."
      keywords="about quality sensei, testing education, software testing mission, QA professional development"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Quality Sensei
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Empowering the next generation of software testing professionals through innovative education.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-4">
                <p>
                  At Quality Sensei, we believe that software testing is both a science and an art. 
                  Our mission is to elevate the practice of software testing through comprehensive, 
                  hands-on education that prepares professionals for real-world challenges.
                </p>
                <p>
                  We're committed to bridging the gap between theoretical knowledge and practical application, 
                  creating learning experiences that transform students into confident, skilled testing professionals.
                </p>
                <p>
                  Through our innovative curriculum, expert instructors, and supportive community, 
                  we're shaping the future of quality assurance in the digital world.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <BadgeCheck className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">Committed to the highest standards in everything we do.</p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <Award className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">Constantly evolving our methods to stay ahead of industry trends.</p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <BookOpen className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground">Dedicated to effective learning outcomes and knowledge transfer.</p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">Building a global network of testing professionals who support each other.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={ref} 
        className="py-16 bg-gradient-to-b from-background to-muted/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  duration={2}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section ref={teamRef} className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Rivera', role: 'Founder & Lead Instructor', specialty: 'Automation Frameworks' },
              { name: 'Mei Zhang', role: 'Senior Instructor', specialty: 'API Testing' },
              { name: 'James Wilson', role: 'Curriculum Director', specialty: 'Performance Testing' }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className={cn(
                  "bg-card rounded-lg p-6 shadow-sm text-center",
                  "hover:shadow-md transition-all duration-300"
                )}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground">Specializes in {member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of a growing network of testing professionals. Learn, share, and grow with us.
          </p>
          <a 
            href="/labs" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-6"
          >
            Explore Our Courses
          </a>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;