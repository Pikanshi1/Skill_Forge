import api from "./api";

export type Certificate = { id: string; certificateNo: string; createdAt: string; course: { id: string; title: string; difficulty: string; duration: number } };

class CertificateService {
  async getCertificates() { return api.get<{ data: Certificate[] }>("/certificate"); }
  async generateCertificate(courseId: string) { return api.post<{ data: Certificate }>(`/certificate/generate/${courseId}`); }
}

const certificateService = new CertificateService();
export default certificateService;
