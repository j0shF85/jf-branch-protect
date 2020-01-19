/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  /*
  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })
  */

  // protect master branch when repo get created
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
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

}
