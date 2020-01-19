/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  
  // Run when a repo is created
  app.on('repository.created', async context => {
    // protect master branch
    const createBranchProtectionRule = `
      mutation repository($id: ID!, $pattern: String!, $requiresApprovingReviews: Boolean!, $requiredApprovingReviewCount: Int!) {
        createBranchProtectionRule(input: {repositoryId: $id, pattern: $pattern, requiresApprovingReviews: $requiresApprovingReviews, requiredApprovingReviewCount: $requiredApprovingReviewCount}) {
          clientMutationId
        }
      }
    `
    context.github.graphql(createBranchProtectionRule, {
      id: context.payload.repository.node_id,
      pattern: "master",
      requiresApprovingReviews: true,
      requiredApprovingReviewCount: 2
    })
    
    // create issue for branch protection details
    const sender = context.payload.sender.login
    const createIssue = `
      mutation issue($id: ID!, $title: String!, $body: String!) {
        createIssue(input: {repositoryId: $id, title: $title, body: $body}) {
          clientMutationId
        }
      }
    `
    context.github.graphql(createIssue, {
      id: context.payload.repository.node_id,
      title: "Branch protection rules applied",
      body: `@${sender} Pull request required when merging to master; at least 2 approvals are required`
    })
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

}
