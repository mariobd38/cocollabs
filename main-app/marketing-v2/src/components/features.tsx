import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrainCircuit, GitMerge, GitPullRequest, MessageSquare, Zap, Clock, Shield, Users } from "lucide-react"
import Image from "next/image"

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 border-blue-200 bg-blue-50 text-blue-800 rounded-full"
          >
            Key Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Supercharge your code review process</h2>
          <p className="text-xl text-muted-foreground">
            Cocollabs combines AI-powered insights with seamless integrations to transform how your team reviews code
          </p>
        </div>

        <Tabs defaultValue="ai-insights" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1 bg-muted rounded-lg mb-8">
            <TabsTrigger
              value="ai-insights"
              className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
            >
              <BrainCircuit className="h-4 w-4 mr-2" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
            >
              <Zap className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger
              value="collaboration"
              className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
            >
              <Users className="h-4 w-4 mr-2" />
              Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="automation"
              className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
            >
              <GitMerge className="h-4 w-4 mr-2" />
              Automation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-insights" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">AI-Powered Code Analysis</h3>
                <p className="text-muted-foreground">
                  Our advanced AI engine analyzes your code to identify potential bugs, security vulnerabilities, and
                  performance issues before they reach production.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Shield className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Security Vulnerability Detection</h4>
                      <p className="text-sm text-muted-foreground">Identifies potential security risks in your code</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Zap className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Performance Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Suggests ways to improve code efficiency and performance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <GitPullRequest className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Smart Reviewer Assignment</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically tags the most relevant reviewers for each PR
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden border shadow-lg bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
                <div className="relative p-6">
                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600">Potential memory leak in UserService</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          The useEffect hook is missing a cleanup function
                        </p>
                        <div className="mt-2 text-xs bg-gray-50 p-2 rounded border">
                          <code>src/components/UserProfile.tsx</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Zap className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-600">Database query optimization</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Consider adding an index to improve search performance
                        </p>
                        <div className="mt-2 text-xs bg-gray-50 p-2 rounded border">
                          <code>src/services/search.js</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 border">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <GitPullRequest className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-600">Use async/await pattern</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Replace promise chains with async/await for readability
                        </p>
                        <div className="mt-2 text-xs bg-gray-50 p-2 rounded border">
                          <code>src/controllers/payment.js</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Seamless Integrations</h3>
                <p className="text-muted-foreground">
                  Cocollabs integrates with your existing tools and workflows, bringing AI-powered code reviews to where
                  your team already works.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <GitPullRequest className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub & GitLab Integration</h4>
                      <p className="text-sm text-muted-foreground">Syncs with your repositories and pull requests</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <MessageSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Sync with Slack</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notifications and respond to reviews directly in chat
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Zap className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">IDE Extensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Review code without leaving your development environment
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden border shadow-lg bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
                <div className="relative p-6 flex h-full">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border">
                      <div className="text-center">
                        <div className="mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                          <Image src="/github.svg" alt="Github" width={80} height={80} />
                        </div>
                        <p className="font-medium">GitHub</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border">
                      <div className="text-center">
                        <div className="h-12 w-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">S</span>
                        </div>
                        <p className="font-medium">Slack</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Enhanced Collaboration</h3>
                <p className="text-muted-foreground">
                  Cocollabs brings your team together with synchronized discussions, contextual comments, and real-time
                  notifications.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <MessageSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Synchronized Discussions</h4>
                      <p className="text-sm text-muted-foreground">Comments sync across GitHub, Slack, and IDEs</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Users className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Team Activity Dashboard</h4>
                      <p className="text-sm text-muted-foreground">See what your team is working on in real-time</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Clock className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Review Scheduling</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically schedule reviews based on team availability
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden border shadow-lg bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
                <div className="relative p-6">
                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">SC</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Sarah Chen</h4>
                          <span className="text-xs text-muted-foreground">15 min ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          We should add a cleanup function to prevent memory leaks when the component unmounts.
                        </p>
                        <div className="mt-2 text-xs bg-gray-50 p-2 rounded border">
                          <code>src/components/UserProfile.tsx:45</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">AJ</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Alex Johnson</h4>
                          <span className="text-xs text-muted-foreground">5 min ago</span>
                        </div>
                        <p className="text-sm mt-1">Good catch! I&apos;ll add the cleanup function in the next commit.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">Team Activity</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium">MW</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs">Mike Wilson is reviewing API rate limiting implementation</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium">LP</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs">Lisa Park pushed 3 commits to payment-service</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Intelligent Automation</h3>
                <p className="text-muted-foreground">
                  Cocollabs automates repetitive tasks in your code review workflow, letting your team focus on what
                  matters most.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <GitMerge className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Auto-Merge for Trivial Changes</h4>
                      <p className="text-sm text-muted-foreground">Automatically merge simple PRs after approval</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <GitPullRequest className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Smart PR Summaries</h4>
                      <p className="text-sm text-muted-foreground">AI-generated summaries of code changes</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Clock className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Automated Follow-ups</h4>
                      <p className="text-sm text-muted-foreground">Remind reviewers of pending PRs at optimal times</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden border shadow-lg bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
                <div className="relative p-6">
                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border">
                    <h4 className="font-medium mb-2">PR Summary: Update authentication middleware</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">This PR updates the authentication middleware to:</p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Add support for JWT refresh tokens</li>
                        <li>Improve error handling for expired tokens</li>
                        <li>Add unit tests for token validation</li>
                      </ul>
                      <p className="text-xs text-muted-foreground italic mt-2">Generated by Coco AI</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Auto-merge eligible</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Ready to merge
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This PR contains only documentation changes and has been approved by 2 reviewers.
                    </p>
                    <div className="mt-3 flex items-center text-sm">
                      <GitMerge className="h-4 w-4 mr-1 text-purple-600" />
                      <span className="text-purple-600 font-medium">Will auto-merge in 30 minutes</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 border">
                    <h4 className="font-medium mb-2">Automated Reminders</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-amber-500" />
                          <span>Remind Mike about API rate limiting PR</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-amber-500" />
                          <span>Follow up on database optimization PR</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Today, 4:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
