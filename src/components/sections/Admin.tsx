import { useState, useRef, useEffect } from 'react';
import { CopyPlus, Pencil, Trash2, Image as ImageIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

type Status = '대기 중' | '견적 완료' | '종료됨';

interface DisplayItem {
  id: string;
  imageUrl: string | null;
  type: string;
  name: string;
}

interface Inquiry {
  id: string;
  company: string;
  contact: string;
  category: string;
  date: string;
  status: Status;
  details: {
    country: string;
    industry: string;
    fullName: string;
    phone: string;
    material: string;
    quantity: string;
    conditions: string;
    message: string;
  };
}

const initialInquiries: Inquiry[] = [
  { id: '1', company: 'Acme Aerospace', contact: 'john@acme.com', category: 'Fittings', date: '2026-04-08', status: '대기 중', details: { country: 'United States', industry: 'Aerospace', fullName: 'John Doe', phone: '+1 555-0123', material: 'Inconel 625', quantity: '500 units', conditions: 'High pressure', message: 'Need custom fittings for new engine prototype.' } },
  { id: '2', company: 'Global Tech Mfg', contact: 'sarah@globaltech.com', category: 'Valves', date: '2026-04-07', status: '견적 완료', details: { country: 'Germany', industry: 'Manufacturing', fullName: 'Sarah Muller', phone: '+49 151 1234', material: 'Monel 400', quantity: '200 units', conditions: 'Corrosive', message: 'Standard valves with custom threading.' } },
  { id: '3', company: 'Nexus Industrial', contact: 'm.chen@nexus.io', category: 'Tubing', date: '2026-04-05', status: '종료됨', details: { country: 'Singapore', industry: 'Oil & Gas', fullName: 'Michael Chen', phone: '+65 9123 4567', material: 'Alloy 825', quantity: '1000 meters', conditions: 'Subsea', message: 'Seamless tubing required.' } },
  { id: '4', company: 'Oceanic Drilling', contact: 'procurement@oceanic.com', category: 'Fittings', date: '2026-02-15', status: '종료됨', details: { country: 'Norway', industry: 'Offshore', fullName: 'Lars Bakken', phone: '+47 4000 1111', material: 'Super Duplex', quantity: '150 units', conditions: 'High salinity', message: 'Replacement parts for rig alpha.' } },
  { id: '5', company: 'AeroDynamics Inc', contact: 'supply@aerodynamics.com', category: 'Valves', date: '2025-11-20', status: '종료됨', details: { country: 'UK', industry: 'Aviation', fullName: 'Emma Watson', phone: '+44 7700 9000', material: 'Inconel 625', quantity: '50 units', conditions: 'Extreme temp', message: 'Testing new valve designs.' } },
  { id: '6', company: 'ChemCorp', contact: 'buyer@chemcorp.net', category: 'Tubing', date: '2025-08-10', status: '종료됨', details: { country: 'USA', industry: 'Chemical', fullName: 'David Smith', phone: '+1 555-9999', material: 'Alloy 600', quantity: '300 meters', conditions: 'Acidic', message: 'Facility expansion project.' } },
  { id: '7', company: 'Stellar Space', contact: 'parts@stellar.space', category: 'Fittings', date: '2025-05-04', status: '종료됨', details: { country: 'USA', industry: 'Space', fullName: 'Alice Johnson', phone: '+1 555-8888', material: 'Inconel 625', quantity: '100 units', conditions: 'Vacuum, Cryogenic', message: 'Propulsion system fittings.' } },
];

interface AdminProps {
  productItems?: DisplayItem[];
  setProductItems?: (items: DisplayItem[]) => void;
  mainItems?: DisplayItem[];
  setMainItems?: (items: DisplayItem[]) => void;
  pageBanners?: {
    about?: string;
    capability?: string;
    products?: string;
    contact?: string;
  };
  setIsAuthenticated?: (value: boolean) => void;
}

export default function Admin({ productItems = [], setProductItems, mainItems = [], setMainItems, pageBanners = {}, setIsAuthenticated }: AdminProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'main' | 'products' | 'banners'>('dashboard');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<DisplayItem | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<DisplayItem | null>(null);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DisplayItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')), (snapshot) => {
      const fetchedInquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
      setInquiries(fetchedInquiries);
    }, (error) => {
      console.error("Error fetching inquiries:", error);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPendingFile(file);
      setPendingItem({
        id: 'temp',
        imageUrl,
        type: activeTab === 'products' ? 'Fittings' : '새 제품종류',
        name: activeTab === 'products' ? '' : '새 제품명'
      });
      setIsAddModalOpen(true);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBannerUpload = async (pageId: string, file: File) => {
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `banners/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      
      await updateDoc(doc(db, 'pageBanners', pageId), {
        imageUrl,
        updatedAt: serverTimestamp()
      }).catch(async (error) => {
        // If document doesn't exist, create it
        if (error.code === 'not-found') {
          const { setDoc } = await import('firebase/firestore');
          await setDoc(doc(db, 'pageBanners', pageId), {
            imageUrl,
            updatedAt: serverTimestamp()
          });
        } else {
          throw error;
        }
      });
    } catch (error) {
      console.error("Error updating banner:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleExportData = () => {
    try {
      const exportData = inquiries.map(inq => ({
        'ID': inq.id,
        '회사명': inq.company,
        '담당자 성함': inq.details.fullName,
        '이메일': inq.contact,
        '연락처': inq.details.phone,
        '국가': inq.details.country,
        '산업 분야': inq.details.industry,
        '카테고리': inq.category,
        '요구 소재': inq.details.material,
        '수량': inq.details.quantity,
        '작동 환경': inq.details.conditions,
        '요구사항': inq.details.message,
        '날짜': inq.date,
        '상태': inq.status
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "견적요청목록");

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = `견적요청목록_${new Date().toISOString().split('T')[0]}.xlsx`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      // Fallback error logging, avoiding alert() in iframe
    }
  };

  const renderDashboard = () => {
    if (selectedInquiryId) {
      const inquiry = inquiries.find(i => i.id === selectedInquiryId);
      if (!inquiry) return null;

      return (
        <div className="p-12 w-full max-w-5xl">
          <button 
            onClick={() => setSelectedInquiryId(null)}
            className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            목록으로 돌아가기
          </button>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{inquiry.company}</h2>
                <p className="text-gray-500 mt-1">접수일: {inquiry.date}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                inquiry.status === '대기 중' ? 'bg-yellow-100 text-yellow-800' :
                inquiry.status === '견적 완료' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {inquiry.status}
              </span>
            </div>
            
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">문의 상세 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">담당자 성함</p>
                  <p className="font-medium text-gray-900">{inquiry.details.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">이메일</p>
                  <p className="font-medium text-gray-900">{inquiry.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">연락처</p>
                  <p className="font-medium text-gray-900">{inquiry.details.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">국가</p>
                  <p className="font-medium text-gray-900">{inquiry.details.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">산업 분야</p>
                  <p className="font-medium text-gray-900">{inquiry.details.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">제품 카테고리</p>
                  <p className="font-medium text-gray-900">{inquiry.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">요구 소재</p>
                  <p className="font-medium text-gray-900">{inquiry.details.material}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">수량</p>
                  <p className="font-medium text-gray-900">{inquiry.details.quantity}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">작동 환경 (Operating Conditions)</p>
                  <p className="font-medium text-gray-900">{inquiry.details.conditions}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">요구사항 및 메시지</p>
                <p className="text-gray-900 whitespace-pre-wrap">{inquiry.details.message}</p>
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">상태 변경</h3>
            <div className="flex gap-4">
              {(['대기 중', '견적 완료', '종료됨'] as Status[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(inquiry.id, status)}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors border ${
                    inquiry.status === status 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-12 w-full max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-wide">ADMIN DASHBOARD | 문의관리</h1>
            <p className="text-gray-500 mt-2 text-sm">견적 요청 및 시스템 설정을 관리합니다.</p>
          </div>
          <button 
            onClick={handleExportData}
            className="bg-gray-900 text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            데이터 내보내기
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">전체 요청</h3>
            <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-400 ml-2">지난달 대비</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">대기 중인 견적</h3>
            <p className="text-3xl font-bold text-gray-900">{inquiries.filter(i => i.status === '대기 중').length}</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">조치 필요</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">진행 중인 프로젝트</h3>
            <p className="text-3xl font-bold text-gray-900">18</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-blue-600 font-medium">생산 중</span>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">견적 요청 목록 (최근 1년)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">회사명</th>
                  <th className="px-6 py-4 font-medium">연락처</th>
                  <th className="px-6 py-4 font-medium">카테고리</th>
                  <th className="px-6 py-4 font-medium">날짜</th>
                  <th className="px-6 py-4 font-medium">상태</th>
                  <th className="px-6 py-4 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{inquiry.company}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.contact}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.category}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        inquiry.status === '대기 중' ? 'bg-yellow-100 text-yellow-800' :
                        inquiry.status === '견적 완료' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedInquiryId(inquiry.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {inquiry.status === '대기 중' ? '검토' : '보기'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }

    if (activeTab === 'banners') {
      const bannerPages = [
        { id: 'about', label: 'About 페이지 배너' },
        { id: 'capability', label: 'Capability 페이지 배너' },
        { id: 'products', label: 'Products 페이지 배너' },
        { id: 'contact', label: 'Contact 페이지 배너' },
      ];

      return (
        <div className="p-12 w-full">
          <div className="mb-16">
            <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
              ADMIN DASHBOARD | 서브페이지 배너설정
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              각 서브페이지 상단에 노출되는 메인 이미지를 관리합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {bannerPages.map(page => (
              <div key={page.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">{page.label}</h3>
                </div>
                <div className="p-6">
                  <div className="aspect-[21/9] bg-gray-100 rounded-lg mb-6 overflow-hidden relative group">
                    {pageBanners[page.id as keyof typeof pageBanners] ? (
                      <img src={pageBanners[page.id as keyof typeof pageBanners]} alt={page.label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon className="w-12 h-12 mb-2" strokeWidth={1} />
                        <span className="text-sm">이미지 없음</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                        이미지 변경
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleBannerUpload(page.id, file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const currentItems = activeTab === 'main' ? mainItems : productItems;

    return (
      <div className="p-12 w-full">
        <div className="mb-16">
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            ADMIN DASHBOARD | {activeTab === 'main' ? 'MAIN' : '제품설정'}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            PATERON 사이트의 모든 요소를 실시간으로 제어합니다.
          </p>
        </div>

        <div className="flex gap-5 mb-10 text-gray-600">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="hover:text-gray-900 transition-colors"
            title="이미지 추가"
          >
            <CopyPlus className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => { setIsEditMode(!isEditMode); setIsDeleteMode(false); }}
            className={`transition-colors ${isEditMode ? 'text-blue-600' : 'hover:text-gray-900'}`} 
            title="수정"
          >
            <Pencil className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => { setIsDeleteMode(!isDeleteMode); setIsEditMode(false); }}
            className={`transition-colors ${isDeleteMode ? 'text-red-600' : 'hover:text-gray-900'}`} 
            title="삭제"
          >
            <Trash2 className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-wrap gap-8">
          {currentItems.map((item) => (
            <div 
              key={item.id} 
              className={`w-48 ${isEditMode ? 'cursor-pointer ring-2 ring-transparent hover:ring-blue-500 rounded-2xl transition-all' : isDeleteMode ? 'cursor-pointer ring-2 ring-transparent hover:ring-red-500 rounded-2xl transition-all' : ''}`}
              onClick={() => {
                if (isEditMode) {
                  setEditingItem({ ...item });
                } else if (isDeleteMode) {
                  setItemToDelete(item);
                }
              }}
            >
              <div className="w-48 h-48 bg-[#EBEBEB] rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-gray-300" strokeWidth={1} />
                )}
                {isEditMode && (
                  <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Pencil className="w-8 h-8 text-blue-600 drop-shadow-md" />
                  </div>
                )}
                {isDeleteMode && (
                  <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Trash2 className="w-8 h-8 text-red-600 drop-shadow-md" />
                  </div>
                )}
              </div>
              {activeTab === 'products' && (
                <>
                  <div className="flex justify-between text-[13px] text-gray-500 mb-2 px-1">
                    <span>종류</span>
                    <span>{item.type}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-gray-500 px-1">
                    <span>명칭</span>
                    <span>{item.name}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="relative w-[260px] min-h-screen flex flex-col py-14 shrink-0 overflow-hidden">
        {/* Background Image & Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1584936628073-159694d58843?q=80&w=800&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-gray-900/95" />

        {/* Content */}
        <div className="relative z-10 px-12 mb-24">
          <h1 className="text-2xl font-extrabold tracking-[0.25em] uppercase text-white">
            PATERON
          </h1>
        </div>
        
        <nav className="relative z-10 flex flex-col gap-8 px-12 text-right">
          <button 
            onClick={() => { setActiveTab('dashboard'); setSelectedInquiryId(null); }}
            className={`text-[15px] tracking-wide transition-all duration-300 flex justify-end items-center group ${activeTab === 'dashboard' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`h-[1px] bg-white transition-all duration-300 mr-4 ${activeTab === 'dashboard' ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-50'}`}></span>
            문의관리
          </button>
          <button 
            onClick={() => { setActiveTab('main'); setSelectedInquiryId(null); }}
            className={`text-[15px] tracking-wide transition-all duration-300 flex justify-end items-center group ${activeTab === 'main' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`h-[1px] bg-white transition-all duration-300 mr-4 ${activeTab === 'main' ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-50'}`}></span>
            메인화면설정
          </button>
          <button 
            onClick={() => { setActiveTab('banners'); setSelectedInquiryId(null); }}
            className={`text-[15px] tracking-wide transition-all duration-300 flex justify-end items-center group ${activeTab === 'banners' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`h-[1px] bg-white transition-all duration-300 mr-4 ${activeTab === 'banners' ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-50'}`}></span>
            서브페이지 배너설정
          </button>
          <button 
            onClick={() => { setActiveTab('products'); setSelectedInquiryId(null); }}
            className={`text-[15px] tracking-wide transition-all duration-300 flex justify-end items-center group ${activeTab === 'products' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`h-[1px] bg-white transition-all duration-300 mr-4 ${activeTab === 'products' ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-50'}`}></span>
            제품설정
          </button>
        </nav>

        <div className="relative z-10 mt-auto px-12 pb-8 flex flex-col gap-4">
          <button 
            onClick={() => navigate('/')}
            className="text-[13px] text-gray-400 hover:text-white transition-colors w-full text-right tracking-wide"
          >
            홈페이지로 이동
          </button>
          <button 
            onClick={() => {
              if (setIsAuthenticated) setIsAuthenticated(false);
              navigate('/');
            }}
            className="text-[13px] text-gray-400 hover:text-white transition-colors w-full text-right tracking-wide"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white overflow-y-auto relative">
        {renderContent()}

        {/* Edit Item Modal */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">항목 수정</h3>
              
              <div className="w-full aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden border border-gray-200 relative group">
                {editingItem.imageUrl ? (
                  <img src={editingItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-300" strokeWidth={1} />
                  </div>
                )}
                <div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => editFileInputRef.current?.click()}
                >
                  <span className="text-white text-sm font-medium">이미지 변경</span>
                </div>
                <input 
                  type="file" 
                  ref={editFileInputRef} 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditingFile(file);
                      setEditingItem({ ...editingItem, imageUrl: URL.createObjectURL(file) });
                    }
                  }} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="space-y-4 mb-8">
                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">종류</label>
                      <select
                        value={editingItem.type}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                      >
                        <option value="Fittings">Fittings</option>
                        <option value="Valves">Valves</option>
                        <option value="Tubing">Tubing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">명칭</label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        placeholder="명칭을 입력하세요"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={async () => {
                    if (!editingItem) return;
                    setIsUploading(true);
                    try {
                      let imageUrl = editingItem.imageUrl;
                      if (editingFile) {
                        const storageRef = ref(storage, `images/${Date.now()}_${editingFile.name}`);
                        await uploadBytes(storageRef, editingFile);
                        imageUrl = await getDownloadURL(storageRef);
                      }
                      
                      const collectionName = activeTab === 'main' ? 'mainItems' : 'productItems';
                      await updateDoc(doc(db, collectionName, editingItem.id), {
                        imageUrl,
                        type: editingItem.type,
                        name: editingItem.name
                      });
                      
                      setEditingItem(null);
                      setEditingFile(null);
                      setIsEditMode(false);
                    } catch (error) {
                      console.error("Error updating item:", error);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  disabled={isUploading}
                  className="px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center min-w-[80px]"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : '확인'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">항목 삭제</h3>
              <p className="text-gray-500 mb-8">
                정말로 이 항목을 삭제하시겠습니까?<br/>이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setItemToDelete(null);
                    setIsDeleteMode(false);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors w-full"
                >
                  취소
                </button>
                <button
                  onClick={async () => {
                    if (!itemToDelete) return;
                    setIsUploading(true);
                    try {
                      const collectionName = activeTab === 'main' ? 'mainItems' : 'productItems';
                      await deleteDoc(doc(db, collectionName, itemToDelete.id));
                      setItemToDelete(null);
                      setIsDeleteMode(false);
                    } catch (error) {
                      console.error("Error deleting item:", error);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  disabled={isUploading}
                  className="px-5 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full flex justify-center items-center"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : '확인'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        {isAddModalOpen && pendingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">새 이미지 추가</h3>
              
              <div className="w-full aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden border border-gray-200">
                <img src={pendingItem.imageUrl!} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 mb-8">
                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">종류</label>
                      <select
                        value={pendingItem.type}
                        onChange={(e) => setPendingItem({ ...pendingItem, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                      >
                        <option value="Fittings">Fittings</option>
                        <option value="Valves">Valves</option>
                        <option value="Tubing">Tubing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">명칭</label>
                      <input
                        type="text"
                        value={pendingItem.name}
                        onChange={(e) => setPendingItem({ ...pendingItem, name: e.target.value })}
                        placeholder="명칭을 입력하세요"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setPendingItem(null);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={async () => {
                    if (!pendingItem) return;
                    setIsUploading(true);
                    try {
                      let imageUrl = null;
                      if (pendingFile) {
                        const storageRef = ref(storage, `images/${Date.now()}_${pendingFile.name}`);
                        await uploadBytes(storageRef, pendingFile);
                        imageUrl = await getDownloadURL(storageRef);
                      }
                      
                      const collectionName = activeTab === 'main' ? 'mainItems' : 'productItems';
                      await addDoc(collection(db, collectionName), {
                        imageUrl,
                        type: pendingItem.type,
                        name: pendingItem.name,
                        createdAt: serverTimestamp()
                      });
                      
                      setIsAddModalOpen(false);
                      setPendingItem(null);
                      setPendingFile(null);
                    } catch (error) {
                      console.error("Error adding item:", error);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  disabled={isUploading}
                  className="px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex justify-center items-center min-w-[80px]"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : '확인'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
