'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/project-data';
import ProjectCard from '../ProjectCard';

export default function JavaApp() {
    const javaProjects = PROJECTS.filter(p => p.category === 'java');

    return (
        <div className="h-full overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-8xl mb-4">☕</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Java Development</h1>
                    <p className="text-gray-600">Enterprise-grade applications with Java</p>
                </div>

                {/* Skills */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Java Skills & Frameworks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {['Spring Boot', 'Hibernate', 'Maven', 'JUnit', 'Spring Security', 'Microservices', 'REST APIs', 'JPA', 'Gradle'].map((lib, index) => (
                            <motion.div
                                key={lib}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center font-medium text-gray-700 hover:shadow-md transition-shadow"
                            >
                                {lib}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                        {javaProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="h-[400px]"
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Code Example */}
                <section className="mt-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Code Example</h2>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-lg">
                        <pre>{`// Spring Boot REST Controller Example
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}`}</pre>
                    </div>
                </section>
            </div>
        </div>
    );
}
