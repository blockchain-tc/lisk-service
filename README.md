![Logo](./docs/assets/banner_service.png)

# Lisk Service

Lisk Service is a web application that allows interaction with various blockchain networks based on Lisk and Bitcoin protocols.

The main focus of Lisk Service is to provide data to the UI clients such as Lisk Desktop and Lisk Mobile. Lisk Service makes it possible to access all blockchain live data in a similar way to the regular Lisk SDK API, and in addition provides users with much more details and endpoints, such as geolocation and various statistics about network usage.

The project implementation is based on Microservices. The technical stack is designed to deliver several micro-services, and each of them provides one particular functionality. The data is served in JSON format and exposed by a public RESTful API.
## Available Services

Lisk Service consists of several separate modules, that can be run independently from the others. Gateway is required to expose the APIs provided by particular services.

Each service is independent part of the repository and is placed in a separate directory in the `./services/` directory. Each of them contains its own `package.json` and `Dockerfile` that are needed to run the module.


| Service                  | Description                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Gateway](services/gateway) | The Gateway service provides the API, which all users of Lisk Service can access and use. Its main purpose is to proxy API requests from users to other services provided by Lisk Service. This provides users with a central point of data access that never breaks existing application compatibility.|
| [Lisk](services/core) | The REST client service acts as a bridge between the Lisk Core and the Lisk Service API. Its main purpose is to provide enriched data from the Lisk Core API. This service is aimed at providing high availability, efficient and reliable access to the Lisk Core API. |
| Bitcoin _(planned)_ | The Bitcoin service communicates with [ElectrumX](https://electrumx.readthedocs.io/en/latest/) to retrieve data from the Bitcoin network. The Bitcoin service provides bitcoin data from Electrum server and acts as a bridge for the Lisk Service API. |
| [Template](services/template) | The Template service is an abstract service that the all Lisk Service services inherit from. It allows all services to share a similar interface and design pattern. Its purpose is to reduce code duplication and increase consistency between each service, simplifying code maintenance and testing. |

**Remarks**

- The default port for REST API requests and Socket.io-based communication is `9901`. It is configurable by Docker environment files.
- REST API can be accessed by any HTTP client such as [Postman]() (GUI), [cURL]() (command-line) and [Swagger]() (browser)
- WebSocket-based APIs can by used through a socket.io library available for many modern programming languages and frameworks
- The default installation method is based on Docker
- PM2-based installation is described here
- Lisk Service is configured to connect mainnet nodes by default

## API documentation

The Gateway service provides the following APIs, which all users of Lisk Service can access and use.

| API                      | Description                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| [HTTP API](https://app.swaggerhub.com/apis/LiskHQ/lisk-service-api/1.0#/)     | HTTP API is the public RESTful API that provides blockchain data in standardized JSON format.   |
| [WebSocket JSON-RPC API](docs/api/websocket_json_rpc_api.md)     | The WebSocket-based JSON-RPC API provides blockchain data in standardized JSON format. The API uses the socket.io library and it is compatible with JSON-RPC 2.0 standard.   |
| [Subscribe API](docs/api/websocket_subscribe_api.md)     | The Subscribe API is an event-driven API. It uses two-way streaming connection, which can notify the client about new data instantly as they arrive. It is responsible for updating users about changes in the blockchain network and markets.   |

## Installation

Make sure that you have the following dependencies installed:
- [Docker]() with [docker-compose]()
- [make]()
- [tar]()

The following documents describe installation of required dependencies on various operating systems.

- [Ubuntu 18.04 LTS Bionic Beaver](./docs/prerequisites_docker_ubuntu.md)
- [Ubuntu 20.04 LTS Focal Fossa](./docs/prerequisites_docker_ubuntu.md)
- [Debian 10 Buster](./docs/prerequisites_docker_debian.md)
- [MacOS 10.15 Catalina](./docs/prerequisites_docker_macos.md)

Retrieve the latest release from [the official repository](https://github.com/LiskHQ/lisk-cloud/releases).

Unpack the source code archive

```bash
tar xf lisk-service-x.y.z.tar.gz
```

### Docker image build (Optional) 

If you want to build the local version of Lisk Service use the following command.

```bash
make build
```

> This step is needed only if you want to build a custom or pre-release version that does not have a pre-built  Docker image in the Docker Hub. The installation script choses the last available stable version on Docker Hub, **unless** there is no local image. If you are unsure about any local builds, use `make clean` command to remove all locally build docker images.

## Configuration

The default configuration is sufficient to run Lisk Service against the [mainnet](https://explorer.lisk.io/) network.

Configuration options are described [in this document](./docs/config_options.md).

> Optional: Check your configuration with the command `make print-config`

## Management

Run the application:

```bash
make up
```

Stop the application:

```bash
make down
```

More specific information to that method is described in the document [Run with Docker](./docs/run_with_docker.md).

For PM2-based installation [this document](./docs/run_with_pm2.md) might be helpful.

## Further development

The possibility of customization and building Lisk Service from local source is described in the document [Building Lisk Service from source](./docs/build_from_source.md).

## Contributors

https://github.com/LiskHQ/lisk-service/graphs/contributors

## License

Copyright 2016-2019 Lisk Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[lisk documentation site]: https://lisk.io/documentation
