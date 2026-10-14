// All site content lives here, so editing the portfolio never means touching a component.

export const profile = {
  name: 'Chandermani Mishra',
  first: 'Chandermani',
  last: 'Mishra',
  role: 'Software Engineer',
  tagline: 'MERN and Java full-stack engineer, freelancing for clients worldwide.',
  location: 'Bahadurgarh, Haryana, India',
  email: 'chandermanimishra91@gmail.com',
  phone: '+91 8607653657',
  phoneHref: 'tel:+918607653657',
  whatsapp: 'https://wa.me/918607653657',
  github: 'https://github.com/Chandermani-web',
  // NOTE: your old site and your GitHub README list different LinkedIn / X URLs.
  // These are the ones from the old site; change here if the README ones are the live ones.
  linkedin: 'https://www.linkedin.com/in/chandermani-mishra-a25473304',
  x: 'https://x.com/Chanderman47595',
}

export const nav = [
  { id: 'about', path: '/about', label: 'About', lede: 'A freelance software engineer, how I work, and what I’m focused on right now.' },
  { id: 'stack', path: '/stack', label: 'Stack', lede: 'The tools I reach for, MERN first, and an honest look at how well I know each one.' },
  { id: 'backend', path: '/mern-java', label: 'MERN & Java', lede: 'Two full-stack lanes I work in, explored layer by layer: MERN, and Java with Spring Boot.' },
  { id: 'projects', path: '/projects', label: 'Projects', lede: 'Things I’ve shipped: what each one does, how it’s built and where it runs.' },
  { id: 'architecture', path: '/architecture', label: 'Architecture', lede: 'How data moves through my projects, and how I think about systems at scale on AWS.' },
  { id: 'services', path: '/services', label: 'Services', lede: 'What I take on for clients, end to end, from the first screen to the live deploy.' },
  { id: 'experience', path: '/experience', label: 'Experience', lede: 'Where I’ve worked and studied, and what came out of it.' },
  { id: 'contact', path: '/contact', label: 'Contact', lede: 'Tell me what you’re building. I reply from my own inbox.' },
]

export const heroTags = ['MongoDB', 'Express', 'React', 'Node.js', 'Redis']
// Second, counter-rotating orbit around the hero core
export const heroTags2 = ['Java', 'Spring Boot', 'PostgreSQL', 'AWS']

export const heroStats = [
  { value: '1 yr', label: 'freelancing as a software engineer' },
  { value: '500+', label: 'teams outranked at SIH 2025' },
  { value: '2', label: 'apps live in production' },
]

export const credentials = [
  { value: '1 yr', label: 'freelance software engineer', tone: 'cyan' },
  { value: 'SIH 2025', label: 'National winner', tone: 'amber' },
  { value: '500+', label: 'teams outranked', tone: 'sky' },
  { value: '2', label: 'live apps shipped', tone: 'cyan' },
]

export const about = {
  headline: 'I build the whole thing, then make it fast.',
  paragraphs: [
    'I’m a software engineer who has been freelancing for a year, with a MERN-first toolbox: React interfaces, Node and Express APIs, MongoDB and Redis behind them, and the Docker pipeline that ships it. Clients get one person who owns the product from the first screen to the live deploy.',
    'I also build Java full stack: layered Spring Boot REST APIs, Spring Security with JWT, and JPA over PostgreSQL, tested with JUnit and Mockito. On top of that sit GenAI features (RAG pipelines with LangChain and LangGraph) and real-time systems on WebRTC and Socket.IO. I debug with traces and logs and look for the root cause rather than guessing.',
  ],
  quote: 'Building reliable products from frontend to infrastructure.',
  focus: [
    { label: 'MERN stack', value: 86 },
    { label: 'React + Tailwind', value: 80 },
    { label: 'Java / Spring Boot', value: 60 },
    { label: 'GenAI / RAG', value: 58 },
    { label: 'Real-time / WebRTC', value: 40 },
    { label: 'Docker / CI-CD', value: 14 },
  ],
  now: 'Freelance software engineer · MERN + Java full stack',
  school: 'Jagannath University · B.Tech CSE · 2023–2027',
}

// Tools, grouped like the diagnostics panel beside the 3D sphere
export const stack = [
  { id: 'mern', label: 'MERN Stack', color: '#3ddc84', items: ['MongoDB', 'Express', 'React.js', 'Node.js'] },
  { id: 'frontend', label: 'Frontend', color: '#ff5a4f', items: ['JavaScript', 'Redux', 'Tailwind', 'Vercel'] },
  { id: 'backend', label: 'Backend & APIs', color: '#7fc3ff', items: ['REST APIs', 'JWT Auth', 'Micro-svc'] },
  { id: 'realtime', label: 'Real-time', color: '#3ddc84', items: ['Socket.IO', 'WebRTC', 'WebSocket'] },
  { id: 'data', label: 'Data', color: '#6b8fe0', items: ['PostgreSQL', 'Redis', 'SQL', 'ChromaDB'] },
  { id: 'ai', label: 'AI & LLM', color: '#ffb347', items: ['LangChain', 'LangGraph', 'RAG', 'LLM APIs'] },
  { id: 'devops', label: 'DevOps & Cloud', color: '#14b8a6', items: ['Docker', 'AWS', 'CI/CD'] },
  { id: 'java', label: 'Java Full Stack', color: '#f0612f', items: ['Core Java', 'Spring Boot', 'Spring MVC', 'Spring Security', 'JPA / Hibernate', 'Maven', 'JUnit'] },
]

export const alsoShipped = [
  'Firebase Authentication',
  'Razorpay Payments',
  'Render Deployments',
  'YouTube Data API',
  'Git & GitHub',
]

export const projects = [
  {
    id: 'cmai',
    mern: true,
    title: 'CM.AI',
    subtitle: 'AI interview and career platform',
    status: 'Live',
    image: '/projects/cmai.jpg',
    summary:
      'A career platform that scores resumes, runs mock interviews and builds learning roadmaps with LangChain and LangGraph agents.',
    points: [
      'Modular REST APIs for auth, resume, interviews and billing',
      'LangChain + LangGraph pipelines for scoring, mock interviews and roadmaps',
      'Redis sessions, caching and rate limiting on MongoDB',
      'Firebase Auth and Razorpay payments, Dockerized on Render',
    ],
    flow: ['React', 'Express', 'Redis', 'Mongo', 'LLM'],
    stack: ['React', 'Redux', 'Express', 'MongoDB', 'Redis', 'LangChain', 'LangGraph', 'Docker'],
    links: { live: 'https://cmai-self.vercel.app/', github: 'https://github.com/Chandermani-web/CM.AI' },
  },
  {
    id: 'lingolive',
    mern: true,
    title: 'Lingolive',
    subtitle: 'Real-time voice, video and chat',
    status: 'Live',
    image: '/projects/lingolive.jpg',
    summary:
      'Talk across languages in real time: peer-to-peer voice and video over WebRTC, with a custom Socket.IO signaling server and speech-to-text translation.',
    points: [
      'Peer-to-peer voice and video with WebRTC',
      'Custom Socket.IO signaling server for live events',
      'Whisper speech-to-text with a translation pipeline',
      'MongoDB schemas for chats, posts, friends and alerts',
    ],
    flow: ['React', 'Socket.IO', 'WebRTC', 'Mongo', 'Redis'],
    stack: ['React', 'Tailwind', 'Node.js', 'Socket.IO', 'WebRTC', 'MongoDB', 'Whisper', 'Cloudinary'],
    links: { live: 'https://lingolive.onrender.com', github: 'https://github.com/Chandermani-web/lingolive' },
  },
  {
    id: 'ugc',
    mern: true,
    title: 'UGC–AICTE Automation',
    subtitle: 'Smart India Hackathon 2025, national winner',
    status: 'Winner',
    image: '/projects/ugc.jpg',
    summary:
      'A platform that digitizes academic approval workflows for UGC and AICTE: role-based access, document validation and live status tracking.',
    points: [
      'Role-based dashboards for institutions and authorities',
      'Document workflow logic with AI-assisted validation',
      'Chart.js analytics for approvals and bottlenecks',
      'Won among 500+ teams at the national level',
    ],
    flow: ['React', 'Express', 'Mongo', 'AI'],
    stack: ['React', 'Tailwind', 'Chart.js', 'Node.js', 'MongoDB', 'Python', 'YOLO', 'Whisper'],
    links: { github: 'https://github.com/Chandermani-web/edu-regulation-automation-platform' },
  },
]

// ---------------------------------------------------------------------------
// Java full stack section
// ---------------------------------------------------------------------------
// Layers of the 3D stack, top (browser) to bottom (database). Edit freely.
export const javaLayers = [
  { id: 'ui', title: 'React UI', sub: 'Vite · Redux · Axios', tone: 'cyan', note: 'The browser app. It only ever speaks JSON over HTTPS and carries the JWT in an Authorization header.' },
  { id: 'controller', title: 'REST Controllers', sub: 'Spring MVC', tone: 'sky', note: 'Thin @RestController classes: map the URL, validate the body with Bean Validation, call a service, return a DTO. No business logic here.' },
  { id: 'security', title: 'Security Chain', sub: 'Spring Security · JWT', tone: 'amber', note: 'A stateless filter chain: verifies the token, loads the roles and enforces method-level rules like @PreAuthorize before a controller runs.' },
  { id: 'service', title: 'Service Layer', sub: '@Service · @Transactional', tone: 'cyan', note: 'Where the business rules and transaction boundaries live. Easy to unit-test with Mockito because it only depends on interfaces.' },
  { id: 'repository', title: 'Repositories', sub: 'Spring Data JPA', tone: 'sky', note: 'Interfaces that extend JpaRepository, plus JPQL for the awkward queries. Hibernate maps entities to tables underneath.' },
  { id: 'database', title: 'PostgreSQL', sub: 'Relational · ACID', tone: 'violet', note: 'The one database. Constraints, joins and transactions are enforced here, not in application code.' },
]

export const javaTopics = [
  { icon: 'Coffee', title: 'Core Java', text: 'OOP, collections, generics, streams, exceptions and the basics of multithreading.' },
  { icon: 'Layers', title: 'Spring Boot', text: 'Auto-configuration, profiles, validation, global exception handling and Actuator health checks.' },
  { icon: 'ShieldCheck', title: 'Spring Security', text: 'JWT authentication, BCrypt password hashing and role-based access on endpoints and methods.' },
  { icon: 'Database', title: 'JPA and Hibernate', text: 'Entities, relationships, JPQL, pagination, lazy loading and avoiding the N+1 query trap.' },
  { icon: 'FlaskConical', title: 'Testing', text: 'JUnit 5, Mockito and MockMvc for fast unit and slice tests around controllers and services.' },
  { icon: 'Container', title: 'Build and ship', text: 'Maven builds, a multi-stage Docker image, and the same CI/CD and AWS path shown in the architecture below.' },
]

export const javaCode = [
  {
    id: 'controller',
    label: 'Controller',
    file: 'PostController.java',
    code: `@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService posts;

    public PostController(PostService posts) {
        this.posts = posts;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(posts.find(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostDto create(@Valid @RequestBody CreatePostRequest req) {
        return posts.create(req);
    }
}`,
  },
  {
    id: 'service',
    label: 'Service',
    file: 'PostService.java',
    code: `@Service
public class PostService {

    private final PostRepository repo;

    public PostService(PostRepository repo) {
        this.repo = repo;
    }

    // Cache-aside: Redis first, PostgreSQL only on a miss
    @Transactional(readOnly = true)
    @Cacheable(value = "posts", key = "#id")
    public PostDto find(Long id) {
        return repo.findById(id)
                   .map(PostDto::from)
                   .orElseThrow(() -> new NotFoundException("Post " + id));
    }

    @Transactional
    @CacheEvict(value = "posts", allEntries = true)
    public PostDto create(CreatePostRequest req) {
        return PostDto.from(repo.save(new Post(req.title(), req.body())));
    }
}`,
  },
  {
    id: 'repository',
    label: 'Entity + repo',
    file: 'Post.java',
    code: `@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String title;

    @Column(columnDefinition = "text")
    private String body;

    protected Post() { }

    public Post(String title, String body) {
        this.title = title;
        this.body = body;
    }
}

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select p from Post p where lower(p.title) like lower(concat('%', :q, '%'))")
    Page<Post> search(@Param("q") String q, Pageable pageable);
}`,
  },
  {
    id: 'security',
    label: 'Security',
    file: 'SecurityConfig.java',
    code: `@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain chain(HttpSecurity http, JwtFilter jwt) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a -> a
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwt, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
  },
  {
    id: 'test',
    label: 'Test',
    file: 'PostControllerTest.java',
    code: `@WebMvcTest(PostController.class)
class PostControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private PostService posts;

    @Test
    void getReturnsThePost() throws Exception {
        given(posts.find(1L)).willReturn(new PostDto(1L, "Hello", "World"));

        mvc.perform(get("/api/v1/posts/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.title").value("Hello"));
    }
}`,
  },
]

// ---------------------------------------------------------------------------
// System-design diagram (3D). Positions are [x, y, z] scene units:
// x runs left to right along the request path, z is depth.
// One database only: PostgreSQL on RDS, sharded and replicated.
// ---------------------------------------------------------------------------
export const arch = {
  edgeTypes: {
    req: { label: 'request path', color: '#ff5a4f' },
    cache: { label: 'cache lookup', color: '#b794f6' },
    repl: { label: 'replication', color: '#ffb347' },
    egress: { label: 'outbound via forward proxy', color: '#3ddc84' },
    deploy: { label: 'CI/CD release', color: '#7fc3ff' },
  },
  nodes: [
    { id: 'client', title: 'Client', sub: 'React · Browser', kind: 'client', pos: [-8.7, 0, 0], tone: 'cyan', size: [1.8, 1.1, 1.1], note: 'The React app in the browser. It only knows a domain name, never a server address, and talks JSON over HTTPS.' },
    { id: 'dns', title: 'Route 53', sub: 'DNS · routing', kind: 'edge', pos: [-5.8, 0, -2.7], tone: 'sky', size: [2.0, 1.0, 1.0], note: 'Amazon Route 53 resolves the domain and points users at the nearest healthy CloudFront edge. Health checks allow DNS failover.' },
    { id: 'cdn', title: 'CloudFront', sub: 'CDN · AWS WAF', kind: 'edge', pos: [-5.8, 0, 0], tone: 'cyan', size: [2.0, 1.0, 1.0], note: 'CDN and web application firewall. Static files come from the edge cache near the user, bad requests are dropped by WAF, and only /api traffic continues into the VPC.' },
    { id: 's3', title: 'S3', sub: 'Static assets', kind: 'edge', pos: [-5.8, 0, 2.7], tone: 'sky', size: [2.0, 1.0, 1.0], note: 'Holds the built React bundle and uploads. CloudFront is the only reader, so the bucket itself stays private.' },
    { id: 'alb', title: 'Load Balancer', sub: 'ALB · 2 AZ', kind: 'balancer', shape: 'hex', pos: [-2.9, 0, 0], tone: 'amber', size: [2.0, 0.9, 1.5], note: 'Application Load Balancer. Spreads requests across targets in two availability zones, runs health checks and stops sending traffic to an unhealthy node.' },
    { id: 'rp1', title: 'Reverse Proxy', sub: 'Nginx · AZ a', kind: 'proxy', shape: 'oct', pos: [0, 0, -1.9], tone: 'cyan', size: [1.9, 0.9, 1.3], note: 'Stands in front of the app servers on the server side: ends TLS, routes by path, compresses, rate-limits, and hides the real app addresses from every client.' },
    { id: 'rp2', title: 'Reverse Proxy', sub: 'Nginx · AZ b', kind: 'proxy', shape: 'oct', pos: [0, 0, 1.9], tone: 'cyan', size: [1.9, 0.9, 1.3], note: 'Second copy in the other availability zone, so losing one zone does not take the front door down.' },
    { id: 'app1', title: 'App Server', sub: 'ECS · Java / Node', kind: 'compute', pos: [2.9, 0, -1.9], tone: 'sky', size: [2.0, 1.0, 1.0], note: 'Stateless containers (Spring Boot or Node) in an Auto Scaling group. Identity is a JWT, so any copy can serve any request and the group adds or removes copies with load.' },
    { id: 'app2', title: 'App Server', sub: 'ECS · Java / Node', kind: 'compute', pos: [2.9, 0, 1.9], tone: 'sky', size: [2.0, 1.0, 1.0], note: 'Another copy of the same container image in the second zone. It also makes the outbound calls, which leave through the forward proxy.' },
    { id: 'cache', title: 'Cache', sub: 'Redis · ElastiCache', kind: 'cache', shape: 'cyl', pos: [5.8, 0, 0], tone: 'violet', size: [1.7, 0.8, 1.4], note: 'Cache-aside: the app reads Redis first and goes to PostgreSQL only on a miss, then stores the result with a TTL. The same cluster holds sessions and rate-limit counters.' },
    { id: 'shard1', title: 'Shard 1', sub: 'Primary · writes', kind: 'database', shape: 'cyl', pos: [8.7, 0, -3.9], tone: 'cyan', size: [1.8, 0.9, 1.4], note: 'First slice of the one PostgreSQL database. Rows are placed by hash(user_id), so each shard holds part of the data and writes spread across primaries.' },
    { id: 'rep1', title: 'Replica 1', sub: 'Read-only copy', kind: 'database', shape: 'cyl', pos: [8.7, 0, -1.3], tone: 'sky', size: [1.8, 0.9, 1.4], note: 'Streaming replica of Shard 1. It serves reads and reports, and is promoted if the primary fails.' },
    { id: 'shard2', title: 'Shard 2', sub: 'Primary · writes', kind: 'database', shape: 'cyl', pos: [8.7, 0, 1.3], tone: 'cyan', size: [1.8, 0.9, 1.4], note: 'Second slice of the same database. Adding capacity means adding another shard and moving a range of hash buckets to it.' },
    { id: 'rep2', title: 'Replica 2', sub: 'Read-only copy', kind: 'database', shape: 'cyl', pos: [8.7, 0, 3.9], tone: 'sky', size: [1.8, 0.9, 1.4], note: 'Streaming replica of Shard 2, kept in another availability zone for failover and read scaling.' },
    { id: 'fproxy', title: 'Forward Proxy', sub: 'Squid · egress', kind: 'proxy', shape: 'oct', pos: [2.9, 0, 5.6], tone: 'green', size: [1.9, 0.9, 1.3], note: 'Stands in front of the private servers for outbound traffic. Every call to the internet (LLM API, payments) leaves through this one controlled exit with an allow-list, logs and a fixed IP address.' },
    { id: 'ext', title: 'External APIs', sub: 'LLM · Razorpay', kind: 'external', pos: [8.7, 0, 7.5], tone: 'amber', size: [2.0, 0.8, 0.9], note: 'Third-party services on the public internet. They only ever see the forward proxy address, never an app server.' },
    { id: 'github', title: 'GitHub', sub: 'Push · pull request', kind: 'cicd', pos: [-5.8, 0, -6.9], tone: 'cyan', size: [2.0, 0.7, 1.0], note: 'Source of truth. A push or pull request starts the pipeline.' },
    { id: 'actions', title: 'GitHub Actions', sub: 'CI · test + build', kind: 'cicd', pos: [-2.9, 0, -6.9], tone: 'sky', size: [2.0, 0.7, 1.0], note: 'Continuous integration: lint, unit tests, then a Docker image build, all on every pull request.' },
    { id: 'ecr', title: 'Amazon ECR', sub: 'Image registry', kind: 'cicd', pos: [0, 0, -6.9], tone: 'amber', size: [2.0, 0.7, 1.0], note: 'Private registry. Each image is tagged with the commit hash, so any release can be rolled back by redeploying an older tag.' },
    { id: 'ecs', title: 'ECS Deploy', sub: 'CD · rolling', kind: 'cicd', pos: [2.9, 0, -6.9], tone: 'cyan', size: [2.0, 0.7, 1.0], note: 'Continuous delivery: ECS replaces tasks a few at a time behind the load balancer, draining old ones, so users keep being served during a release.' },
  ],
  edges: [
    ['client', 'dns', 'req'],
    ['client', 'cdn', 'req'],
    ['dns', 'cdn', 'req'],
    ['cdn', 's3', 'req'],
    ['cdn', 'alb', 'req'],
    ['alb', 'rp1', 'req'],
    ['alb', 'rp2', 'req'],
    ['rp1', 'app1', 'req'],
    ['rp2', 'app2', 'req'],
    ['app1', 'cache', 'cache'],
    ['app2', 'cache', 'cache'],
    ['cache', 'shard1', 'req'],
    ['cache', 'shard2', 'req'],
    ['shard1', 'rep1', 'repl'],
    ['shard2', 'rep2', 'repl'],
    ['app2', 'fproxy', 'egress'],
    ['fproxy', 'ext', 'egress'],
    ['github', 'actions', 'deploy'],
    ['actions', 'ecr', 'deploy'],
    ['ecr', 'ecs', 'deploy'],
    ['ecs', 'app1', 'deploy'],
  ],
  // Floor frames. fill: tinted plane only; dashed: dashed outline.
  zones: [
    { id: 'edge', label: 'EDGE · AWS GLOBAL', x: [-7.1, -4.5], z: [-4.4, 4.4], tone: 'sky' },
    { id: 'vpc', label: 'VPC · PRIVATE NETWORK', x: [-4.25, 10.4], z: [-5.7, 6.7], tone: 'cyan', dashed: true },
    { id: 'public', label: 'PUBLIC SUBNET', x: [-4.0, 1.35], z: [-3.6, 3.6], tone: 'sky', fill: true },
    { id: 'private', label: 'PRIVATE SUBNET · AUTO SCALING', x: [1.55, 7.2], z: [-3.6, 3.6], tone: 'cyan', fill: true },
    { id: 'db', label: 'POSTGRESQL · RDS', x: [7.45, 9.95], z: [-5.2, 5.2], tone: 'amber' },
    { id: 'cicd', label: 'CI/CD PIPELINE', x: [-7.3, 4.4], z: [-8.2, -6.1], tone: 'sky', dashed: true },
  ],
  platform: ['IAM · least privilege', 'Secrets Manager', 'CloudWatch · logs + alarms', 'Security Groups'],
}

export const archFlow = {
  request: [
    { title: 'Resolve', text: 'The browser asks Route 53 for the domain and is pointed at the nearest CloudFront edge.' },
    { title: 'Edge', text: 'CloudFront serves static files from S3. AWS WAF drops bad requests; only /api traffic continues.' },
    { title: 'Balance', text: 'The Application Load Balancer picks a healthy target across two availability zones.' },
    { title: 'Reverse proxy', text: 'Nginx ends TLS, routes by path, compresses and rate-limits, so app servers are never exposed directly.' },
    { title: 'App and cache', text: 'A stateless app server checks Redis first. A hit is answered without touching the database.' },
    { title: 'Shard and replica', text: 'On a miss the query goes to the shard that owns hash(user_id). Writes hit its primary, reads use its replica.' },
    { title: 'Outbound', text: 'Calls to the LLM and payment APIs leave through the forward proxy, one audited exit.' },
  ],
  release: [
    { title: 'Push', text: 'A pull request on GitHub triggers the pipeline.' },
    { title: 'CI', text: 'GitHub Actions runs lint and tests, then builds a Docker image.' },
    { title: 'Registry', text: 'The image is tagged with the commit and pushed to Amazon ECR.' },
    { title: 'CD', text: 'ECS does a rolling deploy behind the load balancer, so users keep being served during the release.' },
  ],
}

export const missions = [
  { title: 'MERN stack products', text: 'React, Node.js and Express with MongoDB and Redis, built for freelance clients to production standards.', status: 'Active' },
  { title: 'RAG and agentic workflows', text: 'LangChain and LangGraph pipelines with LLM APIs and vector search.', status: 'Active' },
  { title: 'Java full stack', text: 'Spring Boot REST APIs with Spring Security, JPA/Hibernate and PostgreSQL, tested with JUnit and Mockito.', status: 'Active' },
  { title: 'Docker, AWS and CI/CD', text: 'Containerized builds, cloud deployments and automated release pipelines.', status: 'Learning' },
  { title: 'Debugging and performance', text: 'Tracing, caching, rate limiting and query optimisation.', status: 'Ongoing' },
  { title: 'DSA and system design', text: 'Weekly practice on fundamentals and distributed-systems patterns.', status: 'Weekly' },
]

export const timeline = [
  {
    kind: 'Freelance',
    title: 'Freelance Software Engineer',
    org: 'Independent · MERN and Java full stack',
    place: 'Remote · clients worldwide',
    when: '2025 – Present · 1 year',
    tone: 'sky',
    points: [
      'Built 4 core React.js admin workflows for a client (Beritrave Technology): user and driver management, KYC, availability, profiles.',
      'Integrated REST APIs across all 4 modules with Node.js services for real-time data updates.',
      'Designed reusable Tailwind components in 5 categories: tables, forms, filters, modals, status.',
      'Contributed to 6 projects and independently built 3, across frontend and REST API integration.',
    ],
  },
  {
    kind: 'Education',
    title: 'B.Tech, Computer Science Engineering',
    org: 'Jagannath University',
    place: 'Bahadurgarh, Haryana (Delhi NCR)',
    when: '2023 – 2027',
    tone: 'cyan',
    points: ['CGPA 7.8 / 10', 'Data Structures and Algorithms, OOP, DBMS'],
  },
  {
    kind: 'Award',
    title: 'National winner, Smart India Hackathon 2025',
    org: 'Winner among 500+ teams',
    place: 'AICTE, Government of India',
    when: '9–10 Dec 2025',
    tone: 'amber',
    points: [
      'UGC–AICTE approval automation platform with role-based access control, document validation and real-time status tracking.',
    ],
  },
]

// ---------------------------------------------------------------------------
// Architecture lab: the real data flow of each project, node by node.
// Order and labels mirror `projects[].flow`; text is drawn from that project's own summary and points.
// kind -> colour: client cyan, api sky, cache violet, data green, realtime amber, ai amber
// ---------------------------------------------------------------------------
export const flowKinds = {
  client: { label: 'client', color: '#ff5a4f' },
  api: { label: 'API / server', color: '#7fc3ff' },
  cache: { label: 'cache', color: '#b794f6' },
  data: { label: 'data store', color: '#3ddc84' },
  realtime: { label: 'real-time', color: '#ffb347' },
  ai: { label: 'AI / LLM', color: '#ffb347' },
  external: { label: 'external API', color: '#6b8fe0' },
}

export const projectFlows = {
  cmai: [
    { name: 'React', sub: 'React · Redux · Tailwind', kind: 'client', text: 'The client. Redux holds app state; every call goes to the REST API as JSON.' },
    { name: 'Express', sub: 'Node.js · REST', kind: 'api', text: 'Modular REST APIs split by concern: auth, resume, interviews and billing. Firebase Authentication and Razorpay payments are handled here.' },
    { name: 'Redis', sub: 'sessions · cache · rate limits', kind: 'cache', text: 'Sessions, caching and rate limiting sit in front of the database so repeated reads and abusive clients never reach MongoDB.' },
    { name: 'Mongo', sub: 'MongoDB', kind: 'data', text: 'The application data store behind the cache.' },
    { name: 'LLM', sub: 'LangChain · LangGraph', kind: 'ai', text: 'LangChain and LangGraph pipelines call LLM APIs to score resumes, run mock interviews and build learning roadmaps.' },
  ],
  lingolive: [
    { name: 'React', sub: 'React · Tailwind', kind: 'client', text: 'The client for chats, posts, friends and voice/video calls.' },
    { name: 'Socket.IO', sub: 'custom signaling server', kind: 'realtime', text: 'A custom Socket.IO signaling server on Node.js. It carries live events and the handshake that lets two browsers set up a call.' },
    { name: 'WebRTC', sub: 'peer-to-peer media', kind: 'realtime', text: 'Peer-to-peer voice and video. Once signaling completes, media flows browser to browser instead of through the server.' },
    { name: 'Mongo', sub: 'MongoDB', kind: 'data', text: 'MongoDB schemas for chats, posts, friends and alerts.' },
    { name: 'Redis', sub: 'fast shared state', kind: 'cache', text: 'The fast-state layer that appears in this project’s data flow alongside MongoDB.' },
  ],
  ugc: [
    { name: 'React', sub: 'React · Tailwind · Chart.js', kind: 'client', text: 'Role-based dashboards for institutions and authorities, with Chart.js analytics for approvals and bottlenecks.' },
    { name: 'Express', sub: 'Node.js API', kind: 'api', text: 'Role-based access, document workflow logic and live status tracking for UGC and AICTE approvals.' },
    { name: 'Mongo', sub: 'MongoDB', kind: 'data', text: 'The data store for the approval workflow.' },
    { name: 'AI', sub: 'Python · YOLO · Whisper', kind: 'ai', text: 'AI-assisted document validation. This project took the national win at Smart India Hackathon 2025.' },
  ],
}

// ---------------------------------------------------------------------------
// Skills lab: one honest note per tool in `stack`, keyed by the exact item name.
// `uses` lists where it appears: project ids, plus 'java' (Java stack section) and 'arch' (AWS reference design).
// No proficiency levels here on purpose.
// ---------------------------------------------------------------------------
export const skillNotes = {
  JavaScript: { text: 'The language of every React and Node codebase I ship, from the CM.AI client to the Lingolive signaling server.', uses: ['cmai', 'lingolive', 'ugc'] },
  'React.js': { text: 'The interface layer of all three projects: approval dashboards in UGC–AICTE, chat and calls in Lingolive, the CM.AI client. Also four admin workflows for a freelance client (Beritrave).', uses: ['cmai', 'lingolive', 'ugc'] },
  Redux: { text: 'Global client state for CM.AI.', uses: ['cmai'] },
  Tailwind: { text: 'Styling for Lingolive and UGC–AICTE, plus a reusable set of tables, forms, filters, modals and status components for a freelance client.', uses: ['lingolive', 'ugc'] },
  Vercel: { text: 'Frontend hosting in my toolbox. My other deployments are on Render (CM.AI, Lingolive).', uses: [] },
  'Node.js': { text: 'The runtime behind the Lingolive signaling server and the UGC–AICTE API, and the services I integrated with for a freelance client.', uses: ['lingolive', 'ugc'] },
  Express: { text: 'The HTTP layer of CM.AI: modular routes for auth, resume, interviews and billing.', uses: ['cmai', 'ugc'] },
  'REST APIs': { text: 'Designed for CM.AI and consumed across four admin modules for a freelance client. On the Java side they are layered Spring MVC controllers.', uses: ['cmai', 'java'] },
  'JWT Auth': { text: 'Stateless identity: a Spring Security filter verifies the token in the Java stack, which is also why any app server can serve any request in the AWS design.', uses: ['java', 'arch'] },
  'Micro-svc': { text: 'A pattern I work with at design level. The nearest shipped example is CM.AI’s APIs split by concern (auth, resume, interviews, billing).', uses: ['cmai', 'arch'] },
  'Socket.IO': { text: 'A custom signaling server for Lingolive: live events plus the handshake that sets up calls.', uses: ['lingolive'] },
  WebRTC: { text: 'Peer-to-peer voice and video in Lingolive. After signaling, media flows browser to browser.', uses: ['lingolive'] },
  WebSocket: { text: 'The transport underneath Socket.IO’s live events in Lingolive.', uses: ['lingolive'] },
  MongoDB: { text: 'Primary store for CM.AI, Lingolive (chats, posts, friends, alerts) and UGC–AICTE.', uses: ['cmai', 'lingolive', 'ugc'] },
  PostgreSQL: { text: 'The relational database in the Java stack (JPA/Hibernate) and the single sharded, replicated database in the AWS design.', uses: ['java', 'arch'] },
  Redis: { text: 'CM.AI uses it for sessions, caching and rate limiting. In the AWS design it is the cache-aside layer in front of PostgreSQL.', uses: ['cmai', 'arch'] },
  SQL: { text: 'Schema design and queries behind the PostgreSQL work, including JPQL and constraints in the Java stack.', uses: ['java'] },
  ChromaDB: { text: 'Part of my RAG tooling for vector search. Not tied to a specific project on this page.', uses: [] },
  LangChain: { text: 'Drives CM.AI’s pipelines for resume scoring, mock interviews and learning roadmaps.', uses: ['cmai'] },
  LangGraph: { text: 'Orchestrates the multi-step agent flows in CM.AI.', uses: ['cmai'] },
  RAG: { text: 'An active focus: retrieval-augmented pipelines with LangChain, LangGraph, LLM APIs and vector search. Not tied to a specific project on this page.', uses: [] },
  'LLM APIs': { text: 'CM.AI calls LLM APIs for scoring and interviews. In the AWS design those calls leave through a forward proxy.', uses: ['cmai', 'arch'] },
  Docker: { text: 'CM.AI is Dockerized and deployed on Render. The Java path uses a multi-stage image.', uses: ['cmai', 'java'] },
  AWS: { text: 'The architecture section is a design I have worked through end to end, Route 53 to RDS. I am still learning it hands-on.', uses: ['arch'] },
  'CI/CD': { text: 'Still learning. The GitHub Actions, ECR and ECS pipeline in the architecture section is the target design, not a claim of production use.', uses: ['arch'] },
  'Core Java': { text: 'OOP, collections, generics, streams, exceptions and multithreading basics.', uses: ['java'] },
  'Spring Boot': { text: 'Auto-configuration, profiles, validation, global exception handling and Actuator health checks.', uses: ['java'] },
  'Spring MVC': { text: 'Thin @RestController classes that validate the body, call a service and return a DTO.', uses: ['java'] },
  'Spring Security': { text: 'JWT authentication, BCrypt password hashing and role-based access on endpoints and methods.', uses: ['java'] },
  'JPA / Hibernate': { text: 'Entities, relationships, JPQL, pagination, lazy loading and avoiding the N+1 query trap.', uses: ['java'] },
  Maven: { text: 'Builds and dependency management for the Spring Boot apps, and the first step of the Docker image.', uses: ['java'] },
  JUnit: { text: 'JUnit 5 with Mockito and MockMvc for unit and slice tests around controllers and services.', uses: ['java'] },
}

// Where a skill "lands": project docks in the skills lab. href targets existing sections.
export const skillTargets = [
  { id: 'cmai', label: 'CM.AI', href: '#projects' },
  { id: 'lingolive', label: 'Lingolive', href: '#projects' },
  { id: 'ugc', label: 'UGC–AICTE', href: '#projects' },
  { id: 'java', label: 'Java stack', href: '#backend' },
  { id: 'arch', label: 'AWS design', href: '#architecture' },
]

// ---------------------------------------------------------------------------
// Tool traits shown in the small boxes beside the portrait when a tool is hovered in the Stack section.
// These describe the TOOL (what it is good at), not a rating of me.
// t(power, 'why', speed, 'why', 'ability', 'best for', 'pairs with'); power and speed are 1-5.
// ---------------------------------------------------------------------------
const t = (power, powerText, speed, speedText, ability, best, pairs) => ({ power, powerText, speed, speedText, ability, best, pairs })

export const techStats = {
  MongoDB: t(4, 'flexible documents', 4, 'indexed reads, sharding', 'Schema-flexible storage', 'Product and content data', 'Express, Redis'),
  Express: t(3, 'minimal and flexible', 4, 'thin routing layer', 'Routes and middleware', 'REST APIs', 'Node.js, MongoDB'),
  'React.js': t(4, 'component model', 4, 'virtual DOM diffing', 'Builds interactive UIs', 'Dashboards, SPAs', 'Redux, Tailwind'),
  'Node.js': t(4, 'huge npm ecosystem', 4, 'non-blocking I/O', 'Event-driven servers', 'APIs, real-time apps', 'Express, MongoDB'),
  JavaScript: t(5, 'runs everywhere', 4, 'JIT-compiled', 'One language, browser to server', 'Full-stack apps', 'React, Node.js'),
  Redux: t(3, 'predictable state', 3, 'selector-based updates', 'Shared client state', 'Large client state', 'React.js'),
  Tailwind: t(3, 'utility-first design', 5, 'no runtime CSS', 'Rapid, consistent styling', 'Design systems', 'React.js'),
  Vercel: t(3, 'managed hosting', 5, 'edge CDN deploys', 'Zero-config frontend deploys', 'Static and SSR sites', 'React.js, Git'),
  'REST APIs': t(3, 'simple contracts', 4, 'cacheable over HTTP', 'Clean client-server contracts', 'CRUD services', 'Express, Spring MVC'),
  'JWT Auth': t(3, 'stateless identity', 5, 'no session lookup', 'Role-based access', 'SPAs, many servers', 'Express, Spring Security'),
  'Micro-svc': t(4, 'independent scaling', 3, 'network hops add latency', 'Splits a system by domain', 'Large teams', 'Docker, AWS'),
  'Socket.IO': t(3, 'event-based API', 4, 'low-latency messages', 'Live events and rooms', 'Chat, notifications', 'Node.js, Redis'),
  WebRTC: t(4, 'peer-to-peer media', 5, 'browser to browser', 'Voice and video calls', 'Calls, screen share', 'Socket.IO'),
  WebSocket: t(3, 'full-duplex channel', 5, 'one persistent connection', 'Server push', 'Live feeds', 'Node.js'),
  PostgreSQL: t(5, 'ACID, joins, constraints', 4, 'cost-based planner', 'Relational data integrity', 'Transactions, reports', 'Spring Boot, JPA'),
  Redis: t(4, 'rich data structures', 5, 'in-memory, sub-ms', 'Cache, sessions, counters', 'Hot reads, rate limits', 'Node.js, MongoDB'),
  SQL: t(4, 'declarative queries', 4, 'index-driven', 'Queries relational data', 'Reports, joins', 'PostgreSQL'),
  ChromaDB: t(3, 'vector similarity', 3, 'approximate search', 'Stores embeddings', 'RAG retrieval', 'LangChain'),
  LangChain: t(4, 'chains and tools', 3, 'bound by LLM latency', 'Wires LLMs to tools', 'RAG, agents', 'LLM APIs, ChromaDB'),
  LangGraph: t(4, 'stateful agent graphs', 3, 'bound by LLM latency', 'Multi-step agent flows', 'Agent workflows', 'LangChain'),
  RAG: t(4, 'answers grounded in data', 3, 'retrieve, then generate', 'Answers from your documents', 'Document Q&A', 'ChromaDB, LLM APIs'),
  'LLM APIs': t(5, 'general reasoning', 3, 'network and token latency', 'Understands and writes text', 'Scoring, chat, summaries', 'LangChain'),
  Docker: t(4, 'portable images', 4, 'fast container start', 'Same build everywhere', 'Shipping services', 'AWS, CI/CD'),
  AWS: t(5, 'full cloud toolbox', 4, 'global edge network', 'Scalable infrastructure', 'Production hosting', 'Docker, CI/CD'),
  'CI/CD': t(4, 'automated releases', 5, 'push to deploy in minutes', 'Tested, repeatable deploys', 'Teams shipping often', 'GitHub Actions, Docker'),
  'Core Java': t(5, 'strong typing, rich libraries', 4, 'JIT-optimised JVM', 'Robust backend logic', 'Enterprise systems', 'Spring Boot, Maven'),
  'Spring Boot': t(5, 'batteries included', 4, 'fast to bootstrap', 'Production-ready services', 'REST backends', 'Spring Security, JPA'),
  'Spring MVC': t(4, 'annotation-driven web layer', 4, 'thin controllers', 'Request mapping, validation', 'REST controllers', 'Spring Boot'),
  'Spring Security': t(5, 'filters, roles, JWT', 4, 'stateless filter chain', 'Authentication and authorisation', 'Secured APIs', 'Spring Boot, JWT'),
  'JPA / Hibernate': t(4, 'object-relational mapping', 3, 'watch for N+1 queries', 'Maps entities to tables', 'CRUD-heavy domains', 'PostgreSQL'),
  Maven: t(3, 'dependency management', 3, 'cached builds', 'Reproducible builds', 'Java projects', 'Spring Boot, Docker'),
  JUnit: t(4, 'fast unit tests', 5, 'milliseconds per test', 'Safety net for refactors', 'Services, controllers', 'Mockito, MockMvc'),
}

// ---------------------------------------------------------------------------
// MERN section: the request path of an Express service, controller to container.
// Same shape as `javaLayers`; the layer with id 'database' is drawn as a cylinder.
// ---------------------------------------------------------------------------
export const mernLayers = [
  { id: 'ui', title: 'React UI', sub: 'Vite · Redux · Axios', tone: 'cyan', note: 'The browser app. Redux holds client state; Axios sends JSON over HTTPS with the JWT in an Authorization header.' },
  { id: 'routes', title: 'Express Routes', sub: 'express.Router · REST', tone: 'sky', note: 'One router file per resource. A route only maps a verb and a URL to a controller and the middleware it needs.' },
  { id: 'middleware', title: 'Middleware Chain', sub: 'JWT · CORS · rate limit', tone: 'amber', note: 'Runs before the controller: verifies the JWT, checks the role, applies CORS and rate limits (Redis-backed in CM.AI) and validates the body.' },
  { id: 'controller', title: 'Controllers', sub: 'async handlers', tone: 'cyan', note: 'Thin functions: read the request, call the model or a service, send JSON. Any error goes to one central error handler.' },
  { id: 'model', title: 'Data Models', sub: 'Mongoose · schemas', tone: 'sky', note: 'Schemas describe each collection with validation and indexes for the queries that matter, so bad data is stopped before it is stored.' },
  { id: 'database', title: 'MongoDB', sub: 'Documents · indexes', tone: 'green', note: 'The document store. Chats, posts, approvals and sessions live here, with Redis in front of it for hot reads.' },
]

export const mernTopics = [
  { icon: 'Database', title: 'MongoDB', text: 'Document design, indexes and queries behind chats, posts and approval workflows.' },
  { icon: 'Server', title: 'Node and Express', text: 'Modular routers, middleware chains, async controllers and one central error handler.' },
  { icon: 'Atom', title: 'React', text: 'Hooks, Redux state, reusable Tailwind components and role-based admin dashboards.' },
  { icon: 'KeyRound', title: 'Auth and security', text: 'JWT, Firebase Authentication, role checks and Redis-backed rate limiting.' },
  { icon: 'Radio', title: 'Real-time', text: 'A custom Socket.IO signaling server and WebRTC calls, as in Lingolive.' },
  { icon: 'Container', title: 'Build and ship', text: 'Dockerized services deployed on Render, plus the AWS path in the architecture section.' },
]

export const mernCode = [
  {
    id: 'controller',
    label: 'Controller',
    file: 'controllers/post.controller.js',
    code: `import Post from '../models/Post.js'

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean()
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.id })
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}`,
  },
  {
    id: 'routes',
    label: 'Route',
    file: 'routes/post.routes.js',
    code: `import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getPost, createPost } from '../controllers/post.controller.js'

const router = Router()

router.get('/:id', getPost)
router.post('/', requireAuth, createPost)

export default router`,
  },
  {
    id: 'middleware',
    label: 'Middleware',
    file: 'middleware/auth.js',
    code: `import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Missing token' })

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}`,
  },
  {
    id: 'model',
    label: 'Model',
    file: 'models/Post.js',
    code: `import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 160 },
    body: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  },
  { timestamps: true },
)

export default mongoose.model('Post', postSchema)`,
  },
  {
    id: 'docker',
    label: 'Dockerfile',
    file: 'Dockerfile',
    code: `# build stage
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# runtime stage
FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]`,
  },
]

// ---------------------------------------------------------------------------
// Freelance services and how an engagement runs
// ---------------------------------------------------------------------------
export const services = [
  { icon: 'Atom', title: 'MERN web apps', text: 'End-to-end products on React, Node, Express and MongoDB: auth, dashboards, payments and deployment.', tags: ['React', 'Express', 'MongoDB', 'Node.js'], lead: true },
  { icon: 'Coffee', title: 'Java Spring Boot backends', text: 'Layered REST APIs with Spring Security, JWT, JPA and PostgreSQL, covered by JUnit and Mockito tests.', tags: ['Spring Boot', 'JPA', 'PostgreSQL'] },
  { icon: 'LayoutDashboard', title: 'Admin dashboards', text: 'Role-based panels with tables, filters, forms and charts, built from reusable components.', tags: ['React', 'Tailwind', 'Chart.js'] },
  { icon: 'Radio', title: 'Real-time features', text: 'Chat, live status and WebRTC voice and video, with a Socket.IO signaling server.', tags: ['Socket.IO', 'WebRTC'] },
  { icon: 'Bot', title: 'GenAI and RAG', text: 'LangChain and LangGraph pipelines, LLM APIs and vector search added to an existing product.', tags: ['LangChain', 'RAG', 'ChromaDB'] },
  { icon: 'Container', title: 'Docker and deployment', text: 'Containerised builds and deploys to Render and AWS, with CI/CD where it pays off.', tags: ['Docker', 'AWS', 'CI/CD'] },
]

export const process = [
  { title: 'Discuss', text: 'We agree on the goal, the budget and the deadline.' },
  { title: 'Scope', text: 'You get a short written plan: screens, APIs, data and milestones.' },
  { title: 'Build', text: 'Weekly demos on a staging link, so nothing surprises you.' },
  { title: 'Ship', text: 'Deploy, hand over the code and docs, then fix what turns up.' },
]
