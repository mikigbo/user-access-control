# user-access-control
An Access Control Microservice
kubectl port-forward -n argocd svc/argocd-server 8080:443
TFIHxsLzTBD8E4FZ

kubectl port-forward -n argocd svc/argocd-server 2000:3000


kubectl create secret -n managerapp docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<username> \
  --docker-password=<token> \
  --docker-email=<email>