# Infrastructure

The entirely of the core shorted infrastructure is managed via Terraform within this repository and is broken into the following layers:

- `Core` contains all fundamental resources required to establish the shorted base infrastructure on top of which the other tiering operates. It effectively responsible for establishing the bootstrap/administration layer of shorted. It is very low touch and very little needs to be updated once initialised.

- `Web` contains all resources for the web tiering for shorted, this includes aspects like `CDN`, `Web Hosting`, `Ingress`

- `Services` contains all resources for running services utilised by web components, this includes things like `ElasticSearch`, `Cloud Functions`, `Cloud Run`, `App Engine`, `FireBase`

## Getting started

Firstly its important to understand that the entire stack should be completely reproducible and re-creatable on-demand, with support for a per-tenant/user for testing and validation of critical changes to the different layers over time. Where this services to facilitate dark launches and cut-overs if required as the infrastructure platform evolves

Everything has been bundled into `Makefile` entrypoints for the key steps involved in bootstrapping the environment and subsequent layers.

### Booystrap

Bootstrapping the platform, when utilising [G Suite Organizations]() requires some manual steps, this is to establish an administration project from which authority can be given to manage sub-projects within the organization. These instructions are captured [here](https://cloud.google.com/community/tutorials/managing-gcp-projects-with-terraform) [1] and have been integrated into a nice `Makefile` entrypoint for getting started:

```
make bootstrap.organization
```

> Note: this will need to be run by someone with the `G Suite Super Admin` [2] permissions, ensure this user follows best pratices described in [3]




## References

[1] https://cloud.google.com/community/tutorials/managing-gcp-projects-with-terraform
[2] https://support.google.com/a/answer/2405986?hl=en
[3] https://cloud.google.com/resource-manager/docs/super-admin-best-practices